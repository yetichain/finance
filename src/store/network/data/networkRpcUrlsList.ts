import { ChainId } from '@alium-official/sdk'
import { getNetworks } from 'alium-uikit/src/widgets/WalletModal/config'

// Array of available RPC URLs to connect to
export const networkRpcUrlsList = {
  [ChainId.MAINNET]: process.env.APP_NODES_BSC,
  [ChainId.BSCTESTNET]: process.env.APP_NODES_BSC,
  [ChainId.HECOMAINNET]: process.env.APP_NODES_HECO,
  [ChainId.HECOTESTNET]: process.env.APP_NODES_HECO,
  [ChainId.ETHER_MAINNET]: process.env.APP_NODES_ETHEREUM,
  [ChainId.ETHER_TESTNET]: process.env.APP_NODES_ETHEREUM,
  [ChainId.MATIC_MAINNET]: process.env.APP_NODES_MATIC,
  [ChainId.MATIC_TESTNET]: process.env.APP_NODES_MATIC,
}

export const networkSupportedRpcs = () => {
  const networks = getNetworks()
  const ids = networks.map((network) => network.chainId as number)
  const supportedRpc: unknown = ids.reduce((rpcs, chain) => {
    const rpc = networkRpcUrlsList[chain][0] as string
    return {
      ...rpcs,
      [chain]: rpc,
    }
  }, {})

  return supportedRpc as { [key: number]: string }
}
