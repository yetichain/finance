import { useWeb3React } from '@web3-react/core'
import masterChefABI from 'config/abi/masterchef.json'
import { getFarmsConfig } from 'config/constants/farms/farms'
import { useEffect, useState } from 'react'
import { getMasterChefAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = getFarmsConfig().map((farm) => ({
        address: getMasterChefAddress(),
        name: 'pendingCake',
        params: [farm.pid, account],
      }))

      const res = await multicall(masterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllEarnings
