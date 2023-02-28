import { useActiveWeb3React } from 'hooks'
import React from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'

export const useWeb3Context = () => {
  const { connected } = useStoreNetwork()
  const web3 = useActiveWeb3React()
  const chainId = useStoreNetwork((state) => state.currentChainId)
  const library = React.useMemo(() => web3.library, [web3.library])
  const ethersProvider = library

  const account = React.useMemo(() => web3.account, [web3.account])
  const providerChainId = React.useMemo(() => chainId, [chainId])

  const { availableNetworksBridge } = useBridgeNetworks()

  const wasConnected = (connected || account) && availableNetworksBridge.includes(chainId)

  return { providerChainId, ethersProvider, account, isGnosisSafe: false, connected: wasConnected }
}
