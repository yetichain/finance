import { Contract } from '@ethersproject/contracts'
import { BigNumber, ethers } from 'ethers'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useSingleContractMultipleData } from 'state/multicall/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { getContract } from 'utils'
import {
  AliumVestingAbi,
  NFTPrivateExchangerAbi,
  NFTPublicExchangerAbi,
  NFT_EXCHANGER_PRIVATE,
  NFT_EXCHANGER_PUBLIC,
  NFT_VESTING,
} from 'views/InvestorsAccount/constants'
import { cardListPrivate, cardListPublic, cardListStrategical } from 'views/InvestorsAccount/constants/cards'
import pools, { PoolsTypes } from 'views/InvestorsAccount/constants/pools'
import { useActiveWeb3React } from './index'

export default function useNftPool() {
  const [vestingContract, setVestingContract] = useState<Contract | null>(null)
  const [pendingClaimResult, setPendingClaimResult] = useState<any>(null)
  const [privateExchangerContract, setPrivateExchangerContract] = useState<Contract | null>(null)
  const [publicExchangerContract, setPublicExchangerContract] = useState<Contract | null>(null)
  const { account, library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const { t } = useTranslation()

  useEffect(() => {
    if (library && account) {
      const instance = getContract(NFT_VESTING, AliumVestingAbi, library, account)
      const instancePrivate = getContract(NFT_EXCHANGER_PRIVATE, NFTPrivateExchangerAbi, library, account)
      const instancePublic = getContract(NFT_EXCHANGER_PUBLIC, NFTPublicExchangerAbi, library, account)
      setVestingContract(instance)
      setPrivateExchangerContract(instancePrivate)
      setPublicExchangerContract(instancePublic)
    }
  }, [library, account])

  const balanceInputs = useMemo(() => {
    return pools.map((pool) => [account || '', pool.id]).filter((input) => input[0] !== '')
  }, [account])
  const balancesResult = useSingleContractMultipleData(vestingContract, 'getBalanceOf', balanceInputs)

  const pendingRewardInputs = useMemo(() => {
    return pools.map((pool) => [account || '', pool.id]).filter((input) => input[0] !== '')
  }, [account])
  const pendingRewardResult = useSingleContractMultipleData(vestingContract, 'pendingReward', pendingRewardInputs)

  const nextDateInputs = useMemo(() => {
    return pools.map((pool) => [pool.id])
  }, [])
  const nextDateResult = useSingleContractMultipleData(vestingContract, 'getNextUnlockAt', nextDateInputs)

  const privatePools = pools.filter((pool) => pool.privateCall)
  const publicPools = pools.filter((pool) => !pool.privateCall)

  const publicClaimRewardsInputs = useMemo(() => {
    return publicPools.map((pool) => [pool.id])
  }, [publicPools])

  const privateClaimRewardsInputs = useMemo(() => {
    return privatePools.map((pool) => [pool.id])
  }, [privatePools])

  const publicClaimRewards = useSingleContractMultipleData(publicExchangerContract, 'rewards', publicClaimRewardsInputs)
  const privateClaimRewards = useSingleContractMultipleData(
    privateExchangerContract,
    'rewards',
    privateClaimRewardsInputs,
  )

  const tokensRewards: { [poolId: string]: number | string } = useMemo(() => {
    const newObj = {}
    publicPools.forEach((pool, id) => {
      newObj[pool.id] = ethers.utils.formatEther(publicClaimRewards[id]?.result?.[0] || BigNumber.from(0))
    })
    privatePools.forEach((pool, id) => {
      newObj[pool.id] = ethers.utils.formatEther(privateClaimRewards[id]?.result?.[0] || BigNumber.from(0))
    })
    return newObj
  }, [publicPools, privatePools, publicClaimRewards, privateClaimRewards])

  const cards = [...cardListPublic, ...cardListPrivate, ...cardListStrategical]

  const poolsWithData = useMemo(() => {
    return pools.map((pool, id) => {
      return {
        ...pool,
        total: balancesResult[id]?.result?.[0] || 0,
        locked: balancesResult[id]?.result?.[1] || 0,
        claimed: balancesResult[id]?.result?.[2] || 0,
        unlocked: pendingRewardResult[id]?.result?.[0] || 0,
        timestamp: nextDateResult[id]?.result?.[0].toString() || undefined,
      }
    })
  }, [balancesResult, pendingRewardResult, nextDateResult])

  async function onClaim(pid): Promise<string | null> {
    let blocked = true

    if (vestingContract && !blocked) {
      if (!account) {
        console.warn('No account')
        return null
      }
      setPendingClaimResult([pid, true])
      return vestingContract
        .claim(pid, { from: account })
        .then((response: any) => {
          addTransaction(response, {
            summary: t('Claim YET tokens {{count}}', { count: 1 }),
            additionalData: {
              count: '1',
              card: cards.filter((card) => card.id === pid)?.[0],
              price: tokensRewards[pid],
            },
          })
          return response.hash
        })
        .catch((e) => {
          console.error(e.message || e)
        })
        .finally(setPendingClaimResult(null))
    }
    return null
  }

  const filterPools = (pool: PoolsTypes) => {
    let condition: boolean
    condition = pool.claimed?.toString() !== '0'
    condition = condition || pool.locked?.toString() !== '0'
    condition = condition || pool.unlocked?.toString() !== '0'
    condition = condition || pool.total?.toString() !== '0'
    return condition
  }

  return {
    poolsWithData,
    onClaim,
    pendingClaimResult,
    filterPools,
  }
}
