import { BscConnector } from '@binance-chain/bsc-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'alium-uikit/src'
import { getNetworks } from 'alium-uikit/src/widgets/WalletModal/config'
import { Web3InjectedConnector } from 'connectors/injected/Web3InjectedConnector'
import { networkSupportedRpcs } from 'store/network/data/networkRpcUrlsList'
import { storeNetwork } from 'store/network/useStoreNetwork'
import Web3 from 'web3'

export const getConnectorsByName = (connectorID: ConnectorNames) => {
  const chainId = storeNetwork.getState().currentChainId
  const networks = getNetworks()
  const supportedChainIds = [networks.find((network) => network.chainId === chainId)]?.map(
    (network) => network.chainId as number,
  )
  const supportedRpcs = networkSupportedRpcs()

  const injected = new Web3InjectedConnector({ supportedChainIds }, chainId)

  const walletconnect = new WalletConnectConnector({
    rpc: supportedRpcs,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    supportedChainIds,
    chainId,
  })

  const bscConnector = new BscConnector({ supportedChainIds })

  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.BSC]: bscConnector,
  }

  return { connector: connectorsByName[connectorID] }
}

export const getLibrary = (provider: Web3) => {
  return provider
}
