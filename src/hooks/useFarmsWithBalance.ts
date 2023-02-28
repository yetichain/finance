import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import masterChefABI from 'config/abi/masterchef.json'
import { getFarmsConfig } from 'config/constants/farms/farms'
import { FarmConfig } from 'config/constants/types'
import { useEffect, useState } from 'react'
import { getMasterChefAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import useRefresh from './useRefresh'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = getFarmsConfig().map((farm) => ({
        address: getMasterChefAddress(),
        name: 'pendingCake',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterChefABI, calls)
      const results = getFarmsConfig().map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
