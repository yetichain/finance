import { ChainId } from '@alium-official/sdk'
import { storeNetwork } from '../../../store/network/useStoreNetwork'
import { farmsPoolsMainnet } from './farmsPools.mainnet'
import { farmsPoolsTestnet } from './farmsPools.testnet'

export const getFarmsConfig = () => {
  const chainId = storeNetwork.getState().currentChainId

  if (chainId === ChainId.BSCTESTNET) {
    return farmsPoolsTestnet
  } else {
    return farmsPoolsMainnet
  }
}
