import { ChainId } from '@alium-official/sdk'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'config'
import { getFarmsConfig } from 'config/constants/farms/farms'
import { useEffect, useMemo } from 'react'
import { fetchFarmUserDataAsync } from 'store/farms'
import fetchFarms from 'store/farms/fetchFarms'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { getAlmPrice } from 'utils/prices/getAlmPrice'
import { storeFarms, useStoreFarms } from './../../../store/farms/useStoreFarms'

export const usePollFarmsPublicData = () => {
  const setFarms = useStoreFarms((state) => state.setFarms)
  const farmsLoading = useStoreFarms((state) => state.farmsLoading)
  const setLoading = useStoreFarms((state) => state.toggleFarmsFetched)
  const farmsList = useFarms()
  const supportLoaders = useFarmSupportNetwork()

  useEffect(() => {
    ;(async () => {
      if (farmsLoading || !supportLoaders) return
      setLoading(true)
      const farms = getFarmsConfig()
      try {
        const farmsFetched = await fetchFarms(farms)
        setFarms(farmsFetched)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [supportLoaders])

  return farmsList
}

export const usePollFarmsWithUserData = (includeArchive = false) => {
  const { account } = useWeb3React()
  // hooks
  const setFarmsUserData = useStoreFarms((state) => state.setFarmsUserData)
  const farmsLoading = useStoreFarms((state) => state.farmsLoading)
  const farmsUserDataLoading = useStoreFarms((state) => state.farmsUserDataLoading)
  const setLoading = useStoreFarms((state) => state.toggleUserDataFarmsFetched)
  // farms
  const farmsList = usePollFarmsPublicData()
  // state
  const loading = useMemo(() => !account || farmsLoading, [account, farmsLoading])

  useEffect(() => {
    ;(async () => {
      if (loading || farmsUserDataLoading) return
      setLoading(true)
      const farms = getFarmsConfig()
      const pids = farms.map((farmToFetch) => farmToFetch.pid)
      try {
        const fetchedFarms = await fetchFarmUserDataAsync(account, pids)
        setFarmsUserData(fetchedFarms)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [loading, account])
  return { farmsList, farmsUserDataLoading }
}

const useFarmSupportNetwork = () => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const supportLoaders = useMemo(() => [ChainId.BSCTESTNET, ChainId.MAINNET].includes(currentChainId), [currentChainId])
  return supportLoaders
}

// refact this later (vanilla like method) <-- maybe in store (deprecated, buy use pooling)
export const farmUserDataUpdate = async (account: string, currentPids?: number[]) => {
  const setFarmsUserData = storeFarms.getState().setFarmsUserData
  const setLoading = storeFarms.getState().toggleUserDataFarmsFetched
  try {
    setLoading(true)
    const fetchedFarms = await fetchFarmUserDataAsync(account, currentPids)
    setFarmsUserData(fetchedFarms)
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

export const useFarms = () => {
  const farms = useStoreFarms((state) => state.farms)
  return farms
}

export const useFarmsLoading = () => {
  const farmsLoading = useStoreFarms((state) => state.farmsLoading)
  const farmsUserDataLoading = useStoreFarms((state) => state.farmsUserDataLoading)
  return farmsLoading || farmsUserDataLoading
}

export const useFarmFromPid = (pid: number) => {
  const farm = useStoreFarms((state) => state.farms.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string) => {
  const farm = useStoreFarms((state) => state.farms.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid: number) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

export const usePriceAlmBusd = (): BigNumber => {
  const almCookiePrice = getAlmPrice()

  const almPriceBusd = useMemo(() => {
    return new BigNumber(almCookiePrice)
  }, [almCookiePrice])

  return almPriceBusd
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  return farm?.lpPrice || BIG_ZERO
}
