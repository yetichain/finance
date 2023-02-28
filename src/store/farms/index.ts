import { getFarmsConfig } from 'config/constants/farms/farms'
import { FarmWithUserData } from 'state/types'
import {
  fetchFarmUserAllowances,
  fetchFarmUserEarnings,
  fetchFarmUserStakedBalances,
  fetchFarmUserTokenBalances,
} from './fetchFarmUser'
import { storeFarms } from './useStoreFarms'

// Farm Data with user data
export const fetchFarmUserDataAsync = async (account: string, currentPids?: number[]): Promise<FarmWithUserData[]> => {
  const farms = storeFarms.getState().farms
  const farmsConfig = getFarmsConfig()
  const pids = currentPids || farmsConfig.map((farmToFetch) => farmToFetch.pid)

  const farmsToFetch = farms.filter((farmConfig) => pids.includes(farmConfig.pid))

  const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
  const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
  const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)

  return userFarmAllowances.map((farmAllowance, index) => {
    return {
      pid: farmsToFetch[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })
}
