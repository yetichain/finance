import { ChainId, Currency } from '@alium-official/sdk'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'

const nativeCurrencies = {
  [ChainId.MAINNET]: /********/ new Currency(18, 'BNB', 'Binance'),
  [ChainId.BSCTESTNET]: /*****/ new Currency(18, 'BNB', 'Binance'),
  [ChainId.HECOMAINNET]: /****/ new Currency(18, 'HT', 'Huobi'),
  [ChainId.HECOTESTNET]: /****/ new Currency(18, 'HT', 'Huobi'),
  [ChainId.ETHER_MAINNET]: /**/ new Currency(18, 'ETH', 'Ether'),
  [ChainId.ETHER_TESTNET]: /**/ new Currency(18, 'ETH', 'Ether'),
  [ChainId.MATIC_MAINNET]: /**/ new Currency(18, 'MATIC', 'Polygon'),
  [ChainId.MATIC_TESTNET]: /**/ new Currency(18, 'MATIC', 'Polygon'),
}

export const networkProvidersParamsList: { [key: number]: AddEthereumChainParameter } = {
  [ChainId.MAINNET]: {
    chainId: `0x${ChainId.MAINNET.toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: nativeCurrencies[ChainId.MAINNET],
    rpcUrls: networkRpcUrlsList[ChainId.MAINNET],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  [ChainId.BSCTESTNET]: {
    chainId: `0x${ChainId.BSCTESTNET.toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: nativeCurrencies[ChainId.BSCTESTNET],
    rpcUrls: networkRpcUrlsList[ChainId.BSCTESTNET],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  [ChainId.HECOMAINNET]: {
    chainId: `0x${ChainId.HECOMAINNET.toString(16)}`,
    chainName: 'Heco Chain Mainnet',
    nativeCurrency: nativeCurrencies[ChainId.HECOMAINNET],
    rpcUrls: networkRpcUrlsList[ChainId.HECOMAINNET],
    blockExplorerUrls: ['https://hecoinfo.com/'],
  },
  [ChainId.HECOTESTNET]: {
    chainId: `0x${ChainId.HECOTESTNET.toString(16)}`,
    chainName: 'Heco Chain Testnet',
    nativeCurrency: nativeCurrencies[ChainId.HECOTESTNET],
    rpcUrls: networkRpcUrlsList[ChainId.HECOTESTNET],
    blockExplorerUrls: ['https://testnet.hecoinfo.com/'],
  },
  [ChainId.MATIC_MAINNET]: {
    chainId: `0x${ChainId.MATIC_MAINNET.toString(16)}`,
    chainName: 'Polygon Matic Chain',
    nativeCurrency: nativeCurrencies[ChainId.MATIC_MAINNET],
    rpcUrls: networkRpcUrlsList[ChainId.MATIC_MAINNET],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  [ChainId.MATIC_TESTNET]: {
    chainId: `0x${ChainId.MATIC_TESTNET.toString(16)}`,
    chainName: 'Polygon Matic Chain',
    nativeCurrency: nativeCurrencies[ChainId.MATIC_TESTNET],
    rpcUrls: networkRpcUrlsList[ChainId.MATIC_TESTNET],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
  [ChainId.ETHER_MAINNET]: {
    chainId: `0x${ChainId.ETHER_MAINNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: nativeCurrencies[ChainId.ETHER_MAINNET],
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_MAINNET],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  [ChainId.ETHER_TESTNET]: {
    chainId: `0x${ChainId.ETHER_TESTNET.toString(16)}`,
    chainName: 'Ethereum Chain',
    nativeCurrency: nativeCurrencies[ChainId.ETHER_TESTNET],
    rpcUrls: networkRpcUrlsList[ChainId.ETHER_TESTNET],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
}
