import { ChainId } from '@alium-official/sdk'
import { networkProvidersParamsList } from 'store/network/data/networkProvidersParamsList'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'

export const getNetworkProviderParams = (id?: number): AddEthereumChainParameter => {
  return networkProvidersParamsList?.[id] ?? networkProvidersParamsList[ChainId.MAINNET]
}
