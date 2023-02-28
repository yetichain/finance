import { ChainId } from '@alium-official/sdk'
import tokensBinanceMainnet from 'config/tokens/tokensBinanceMainnet.json'
import tokensBinanceTestnet from 'config/tokens/tokensBinanceTestnet.json'
import tokensEthereumMainnet from 'config/tokens/tokensEthereumMainnet.json'
import tokensEthereumTestnet from 'config/tokens/tokensEthereumTestnet.json'
import tokensHecoTestnet from 'config/tokens/tokensHecoTestnet.json'
import tokensMaticMainnet from 'config/tokens/tokensMaticMainnet.json'
import tokensMaticTestnet from 'config/tokens/tokensMaticTestnet.json'
import tokensHecoMainnet from './tokensHecoMainnet.json'

const DEFAULT_LIST: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: tokensBinanceMainnet,
  [ChainId.BSCTESTNET]: tokensBinanceTestnet,
  [ChainId.HECOMAINNET]: tokensHecoMainnet,
  [ChainId.HECOTESTNET]: tokensHecoTestnet,
  [ChainId.ETHER_MAINNET]: tokensEthereumMainnet,
  [ChainId.ETHER_TESTNET]: tokensEthereumTestnet,
  [ChainId.MATIC_MAINNET]: tokensMaticMainnet,
  [ChainId.MATIC_TESTNET]: tokensMaticTestnet,
}

export default DEFAULT_LIST
