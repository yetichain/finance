import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { BscConnector } from './bsc/bscConnector'
import { NetworkConnector } from './NetworkConnector'

const FORMATIC_KEY = process.env.APP_FORTMATIC_KEY
const PORTIS_ID = process.env.APP_PORTIS_ID

export const getCurrentNetwork = () => {
  const { currentChainId, currentNetwork } = storeNetwork.getState()
  const network = new NetworkConnector({
    urls: { [currentChainId]: currentNetwork.providerParams.rpcUrls[0] },
    defaultChainId: currentChainId,
  })
  return network
}

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  const network = getCurrentNetwork()
  networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any)
  return networkLibrary
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 4, 56, 97, 128, 137, 256, 80001] })
export const bsc = new BscConnector({ supportedChainIds: [1, 4, 56, 97, 128, 137, 256, 80001] })
