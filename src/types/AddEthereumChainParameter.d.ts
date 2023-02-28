import { Currency } from '@alium-official/sdk'

// https://eips.ethereum.org/EIPS/eip-3085
export interface AddEthereumChainParameter {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: Currency
  rpcUrls?: string[]
}
