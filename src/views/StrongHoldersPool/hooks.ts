import { Percent } from '@alium-official/sdk'
import { AddressZero } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useToken } from 'hooks/Tokens'
import { useShpContract, useShpNftContract, useTokenContract } from 'hooks/useContract'
import { useCallback, useMemo, useState } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { getShpAddress } from 'utils/addressHelpers'
import * as api from './api'
import { NftReward, Pool, User, Withdrawal } from './types'
import { findUserByAccount, getAllPoolsIds, getPoolAmount, isFullPool, isUserPaid } from './utils'

// SHP

export function useMaxPoolLength(swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<ethers.BigNumber>('shp/useMaxPoolLength', () => api.getMaxPoolLength(shpContract), {
    revalidateIfStale: false,
    ...swrConfig,
  })
}

export function useCurrentPoolId(swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<ethers.BigNumber>('shp/useCurrentPoolId', () => api.getCurrentPoolId(shpContract), swrConfig)
}

export function usePoolLocked(poolId?: ethers.BigNumber, swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<ethers.BigNumber>(
    poolId ? ['shp/usePoolLocked', poolId] : null,
    () => api.getPoolLocked(shpContract, poolId),
    swrConfig,
  )
}

export function usePoolUsers(poolId?: ethers.BigNumber, swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<User[]>(
    poolId ? ['shp/usePoolUsers', poolId] : null,
    () => api.getPoolUsers(shpContract, poolId),
    swrConfig,
  )
}

export function usePool(poolId?: ethers.BigNumber, swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<Pool>(poolId ? ['shp/usePool', poolId] : null, () => api.getPool(shpContract, poolId), swrConfig)
}

export function useTotalLocked(swrConfig?: SWRConfiguration) {
  const { data: currentPoolId } = useCurrentPoolId()
  const ids = useMemo(() => currentPoolId && getAllPoolsIds(currentPoolId), [currentPoolId])
  return useSWR<ethers.BigNumber>(
    ids ? ['shp/useTotalLocked', ids.length] : null,
    async () => {
      let ret = ethers.BigNumber.from(0)
      const shpAddress = getShpAddress()
      const [pools, locked] = await Promise.all([api.getPools(shpAddress, ids), api.getTotalLocked(shpAddress, ids)])
      ids.forEach((_, i) => {
        ret = ret.add(getPoolAmount(pools[i].withdrawn, locked[i][0]))
      })
      return ret
    },
    swrConfig,
  )
}

export function useRewardToken(swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<string>('shp/useRewardToken', () => api.getRewardToken(shpContract), {
    revalidateIfStale: false,
    ...swrConfig,
  })
}

export function useRewardTokenInfo() {
  const { data: rewardToken } = useRewardToken()
  return useToken(rewardToken)
}

export function useRewardTokenSymbol() {
  const rewardTokenInfo = useRewardTokenInfo()
  return rewardTokenInfo ? rewardTokenInfo.symbol : ''
}

export function useRewardTokenContract() {
  const { data } = useRewardToken()
  return useTokenContract(data)
}

export function useRewardTokenBalance(swrConfig?: SWRConfiguration) {
  const rewardTokenContract = useRewardTokenContract()
  const { account } = useWeb3React()
  return useSWR<ethers.BigNumber>(
    rewardTokenContract && account ? ['shp/useRewardTokenBalance', account] : null,
    () => rewardTokenContract.balanceOf(account),
    swrConfig,
  )
}

export function useRewardTokenAllowance(swrConfig?: SWRConfiguration) {
  const rewardTokenContract = useRewardTokenContract()
  const { account } = useWeb3React()
  return useSWR<ethers.BigNumber>(
    rewardTokenContract && account ? ['shp/useRewardTokenAllowance', account] : null,
    () => rewardTokenContract.allowance(account, getShpAddress()),
    swrConfig,
  )
}

export function useApprove() {
  const rewardTokenContract = useRewardTokenContract()
  const [loading, setLoading] = useState(false)
  const approve = useMemo(
    () =>
      rewardTokenContract &&
      (async () => {
        try {
          setLoading(true)
          const tx = await rewardTokenContract.approve(getShpAddress(), ethers.constants.MaxUint256)
          await tx.wait()
        } finally {
          setLoading(false)
        }
      }),
    [rewardTokenContract],
  )
  return {
    loading,
    approve,
  }
}

export function useLock() {
  const shpContract = useShpContract()
  const [loading, setLoading] = useState(false)
  const { account } = useWeb3React()
  const lock = useCallback(
    async (wei: BigNumber) => {
      try {
        setLoading(true)
        const tx = await shpContract.lock(account, wei.toString())
        await tx.wait()
      } finally {
        setLoading(false)
      }
    },
    [account, shpContract],
  )
  return {
    loading,
    lock,
  }
}

export function usePoolWithdrawals(poolId?: ethers.BigNumber, swrConfig?: SWRConfiguration) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const paidUsers = useMemo(() => poolUsers?.filter(isUserPaid), [poolUsers])
  return useSWR<Withdrawal[]>(
    poolId && paidUsers ? ['shp/usePoolWithdrawals', poolId, paidUsers.length] : null,
    () => api.getPoolWithdrawals(poolId),
    swrConfig,
  )
}

export function useCountReward(poolId?: ethers.BigNumber, swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  const { account } = useWeb3React()
  return useSWR<ethers.BigNumber>(
    poolId && account ? ['shp/useCountReward', poolId, account] : null,
    () => api.countReward(shpContract, poolId, account),
    swrConfig,
  )
}

export function useIsFullPool(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { data: maxPoolLength } = useMaxPoolLength()
  return useMemo(() => poolUsers && maxPoolLength && isFullPool(poolUsers, maxPoolLength), [maxPoolLength, poolUsers])
}

export function usePoolWithdrawPosition(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { data: pool } = usePool(poolId)
  return useMemo(
    () => poolUsers && pool && ethers.BigNumber.from(poolUsers.length).sub(pool.leftTracker),
    [pool, poolUsers],
  )
}

export function usePoolAmount(poolId?: ethers.BigNumber) {
  const { data: pool } = usePool(poolId)
  const { data: poolLocked } = usePoolLocked(poolId)
  return useMemo(() => pool && poolLocked && getPoolAmount(pool.withdrawn, poolLocked), [pool, poolLocked])
}

export function usePoolAccountUser(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { account } = useWeb3React()
  return useMemo(() => poolUsers && findUserByAccount(poolUsers, account), [account, poolUsers])
}

export function useYourPools(swrConfig?: SWRConfiguration) {
  const { data: currentPoolId } = useCurrentPoolId()
  const { account } = useWeb3React()
  const ids = useMemo(() => currentPoolId && getAllPoolsIds(currentPoolId), [currentPoolId])
  return useSWR<ethers.BigNumber[]>(
    ids && account ? ['shp/useYourPools', account, ids.length] : null,
    () => api.getYourPools(getShpAddress(), ids, account),
    swrConfig,
  )
}

export function useWithdraw() {
  const [loading, setLoading] = useState(false)
  const shpContract = useShpContract()
  const withdraw = useCallback(
    async (poolId: ethers.BigNumber) => {
      try {
        setLoading(true)
        const tx = await api.withdraw(shpContract, poolId)
        await tx.wait()
      } finally {
        setLoading(false)
      }
    },
    [shpContract],
  )
  return {
    loading,
    withdraw,
  }
}

export function useCountRewardProfit(poolId?: ethers.BigNumber) {
  const { data: countReward } = useCountReward(poolId)
  const accountUser = usePoolAccountUser(poolId)
  const countRewardProfit = useMemo(
    () =>
      accountUser &&
      countReward &&
      new Percent(countReward.sub(accountUser.balance).toString(), accountUser.balance.toString()),
    [accountUser, countReward],
  )
  const isLoss = useMemo(() => countRewardProfit?.lessThan('0'), [countRewardProfit])
  return {
    countRewardProfit,
    isLoss,
  }
}

export function useOpenedPools(swrConfig?: SWRConfiguration) {
  const { data: currentPoolId } = useCurrentPoolId()
  const { data: maxPoolLength } = useMaxPoolLength()
  const ids = useMemo(() => currentPoolId && getAllPoolsIds(currentPoolId), [currentPoolId])
  return useSWR<ethers.BigNumber>(
    ids && maxPoolLength && ['shp/useOpenedPools', ids.length],
    async () => {
      let ret = ethers.BigNumber.from(0)
      const pools = await api.getPools(getShpAddress(), ids)
      pools.forEach((pool) => {
        if (pool.leftTracker.lt(maxPoolLength)) {
          ret = ret.add(1)
        }
      })
      return ret
    },
    swrConfig,
  )
}

export function useParticipantNumber(poolId?: ethers.BigNumber) {
  const { data: poolUsers } = usePoolUsers(poolId)
  const { account } = useWeb3React()
  return useMemo(() => {
    if (!account || !poolUsers) return undefined

    const accountIndex = poolUsers.findIndex((user) => user.account === account)

    if (accountIndex === -1) {
      // Account is not in the pool. Return next position.
      return new BigNumber(poolUsers.length + 1)
    }

    return new BigNumber(accountIndex + 1)
  }, [account, poolUsers])
}

export function usePoolCreatedAt(poolId?: ethers.BigNumber, swrConfig?: SWRConfiguration) {
  return useSWR<ethers.BigNumber>(
    poolId ? ['shp/usePoolCreatedAt', poolId] : null,
    () => api.getPoolCreatedAt(poolId),
    {
      revalidateIfStale: false,
      ...swrConfig,
    },
  )
}

// NFT

export function useNftRewardPool(swrConfig?: SWRConfiguration) {
  const shpContract = useShpContract()
  return useSWR<string>('shp/useNftRewardPool', () => api.getNftRewardPool(shpContract), {
    revalidateIfStale: false,
    ...swrConfig,
  })
}

export function useNftContract() {
  const { data: nftRewardPool } = useNftRewardPool()
  return useShpNftContract(nftRewardPool === AddressZero ? null : nftRewardPool)
}

export function useNftAllRewards(swrConfig?: SWRConfiguration) {
  const nftContract = useNftContract()
  const { data: maxPoolLength } = useMaxPoolLength()
  return useSWR<Record<string, NftReward[]>>(
    nftContract && maxPoolLength ? ['shp/useNftAllRewards'] : null,
    () => api.getAllNftRewards(nftContract, maxPoolLength),
    swrConfig,
  )
}

export function usePoolNftWithdrawRewards(poolId?: ethers.BigNumber) {
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const { data } = useNftAllRewards()
  return data?.[withdrawPosition?.toString()]
}

export function useNftClaim() {
  const [loading, setLoading] = useState(false)
  const nftContract = useNftContract()
  const { account } = useWeb3React()
  const { data: nftAllRewards } = useNftAllRewards()
  const claim = useMemo(
    () =>
      nftContract &&
      account &&
      nftAllRewards &&
      (async () => {
        try {
          setLoading(true)
          // Check nft logs before claiming
          const logs = await api.getNftLogs(nftContract, account)
          const hasReward = logs.some((log, position) => log.gt(0) && nftAllRewards[position])
          if (hasReward) {
            const tx = await api.nftClaim(nftContract)
            await tx.wait()
          }
          return hasReward
        } finally {
          setLoading(false)
        }
      }),
    [account, nftAllRewards, nftContract],
  )
  return {
    loading,
    claim,
  }
}
