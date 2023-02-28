import { ETH_XDAI_BRIDGE } from 'constants/bridge/bridge.networks'
import { BigNumber } from 'ethers'
import {
  REACT_APP_BSC_RPC_URL,
  REACT_APP_BSC_TESTNET_RPC_URL,
  REACT_APP_DEFAULT_BRIDGE_DIRECTION,
  REACT_APP_HECO_RPC_URL,
  REACT_APP_KOVAN_RPC_URL,
  REACT_APP_MAINNET_RPC_URL,
  REACT_APP_POLYGON_RPC_URL,
  REACT_APP_POLYGON_TESTNET_RPC_URL,
  REACT_APP_RINKEBY_TESTNET_RPC_URL,
  REACT_APP_ROPSTEN_TESTNET_RPC_URL,
  REACT_APP_SOKOL_RPC_URL,
  REACT_APP_UI_STATUS_UPDATE_INTERVAL,
  REACT_APP_XDAI_RPC_URL,
} from './bridge.env'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const ETHER_CURRENCY_LOGO = 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
export const BNB_CURRENCY_LOGO = 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615'
export const MAINNET_BRIDGE_OWNER = '0x43396243f298A9236e48009f27F4150fB8e8f182'
export const TESTNET_BRIDGE_OWNER = '0x43396243f298A9236e48009f27F4150fB8e8f182'

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
)

export const POLLING_INTERVAL = REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000

export const DEFAULT_BRIDGE_DIRECTION = REACT_APP_DEFAULT_BRIDGE_DIRECTION || ETH_XDAI_BRIDGE

export const NON_ETH_CHAIN_IDS = [56, 77, 100, 97, 256, 3, 4, 137, 80001]

export const XDAI_CHAIN_IDS = [77, 100]

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
    homeTokenAddress: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'.toLowerCase(),
  },
  3: {
    chainId: 3,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
    homeTokenAddress: '0xac7fa82f7b2937b0714a61c84fa9902224ad5a65'.toLowerCase(), // maybe incorrect
  },
  4: {
    chainId: 4,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
    homeTokenAddress: '0xdf032bc4b9dc2782bb09352007d4c57b75160b15'.toLowerCase(), // maybe incorrect
  },

  42: {
    chainId: 42,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Kovan Ether',
    symbol: 'KETH',
    mode: 'NATIVE',
    homeTokenAddress: '0x3D14493DF2B479E6BABE82Fc2373F91622bac025'.toLowerCase(),
  },
  56: {
    chainId: 56,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'BNB',
    mode: 'NATIVE',
    homeTokenAddress: '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04'.toLowerCase(),
  },
  97: {
    chainId: 97,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Wrapped Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'WBNB',
    mode: 'NATIVE',
    homeTokenAddress: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'.toLowerCase(),
  },
  256: {
    chainId: 256,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'HECO',
    address: ADDRESS_ZERO,
    symbol: 'HT',
    mode: 'NATIVE',
    homeTokenAddress: '0x66d7494b587cd7a1d39da0f04d04e8f277f2d6cc'.toLowerCase(),
  },
  80001: {
    chainId: 80001,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'MATIC testnet',
    address: ADDRESS_ZERO,
    symbol: 'MATIC',
    mode: 'NATIVE',
    homeTokenAddress: '0x0000000000000000000000000000000000001010'.toLowerCase(),
  },
  137: {
    chainId: 137,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'MATIC',
    address: ADDRESS_ZERO,
    symbol: 'MATIC',
    mode: 'NATIVE',
    homeTokenAddress: '0x0000000000000000000000000000000000001010'.toLowerCase(),
  },
}

export const nativeCurrencyMediators = {
  1: '',
  42: '0x227a6f13aa0dba8912d740c0f88fb1304b2597e1'.toLowerCase(),
  56: '0xefc33f8b2c4d51005585962be7ea20518ea9fd0d'.toLowerCase(),
}

export const networkNames = {
  1: 'ETH Mainnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  97: 'Binance Smart Chain Testnet',
  77: 'Sokol Testnet',
  100: 'xDai Chain',
  256: 'HECO testnet',
  80001: 'POLYGON testnet',
  137: 'Polygon',
  3: 'ROPSTEN testnet',
  4: 'RINKEBY testnet',
}

export const networkLabels = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  100: 'xDai',
  97: 'BSC testnet',
  256: 'HECO testnet',
  80001: 'POLYGON testnet',
  137: 'Polygon',
}

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  42: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  3: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  4: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  56: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  97: {
    name: 'Wrapped Binance Coin',
    symbol: 'WBNB',
  },
  77: {
    name: 'Sokol POA',
    symbol: 'SPOA',
  },
  100: {
    name: 'xDai',
    symbol: 'xDai',
  },
  256: {
    name: 'HECO testnet',
    symbol: 'HT',
  },
  80001: {
    name: 'Matic testnet',
    symbol: 'MATIC',
  },
  137: {
    name: 'Matic Token',
    symbol: 'MATIC',
  },
}

export const chainUrls = {
  1: {
    rpc: REACT_APP_MAINNET_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/mainnet',
    chainId: 1,
    name: networkNames[1],
  },
  42: {
    rpc: REACT_APP_KOVAN_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/kovan',
    chainId: 42,
    name: networkNames[42],
  },
  56: {
    rpc: REACT_APP_BSC_RPC_URL.split(' '),
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: networkNames[56],
  },
  97: {
    rpc: REACT_APP_BSC_TESTNET_RPC_URL.split(' '),
    explorer: 'https://testnet.bscscan.com/',
    chainId: 97,
    name: networkNames[97],
  },
  80001: {
    rpc: REACT_APP_POLYGON_TESTNET_RPC_URL.split(' '),
    explorer: 'https://mumbai.polygonscan.com/',
    chainId: 80001,
    name: networkNames[80001],
  },
  137: {
    rpc: REACT_APP_POLYGON_RPC_URL.split(' '),
    explorer: 'https://polygonscan.com/',
    chainId: 137,
    name: networkNames[137],
  },
  77: {
    rpc: REACT_APP_SOKOL_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: networkNames[77],
  },
  100: {
    rpc: REACT_APP_XDAI_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/xdai/mainnet',
    chainId: 100,
    name: networkNames[100],
  },
  256: {
    rpc: REACT_APP_HECO_RPC_URL.split(' '),
    explorer: 'https://testnet.hecoinfo.com',
    chainId: 256,
    name: networkNames[256],
  },
  3: {
    rpc: REACT_APP_ROPSTEN_TESTNET_RPC_URL.split(' '),
    explorer: 'https://ropsten.etherscan.io/',
    chainId: 3,
    name: networkNames[3],
  },
  4: {
    rpc: REACT_APP_RINKEBY_TESTNET_RPC_URL.split(' '),
    explorer: 'https://rinkeby.etherscan.io/',
    chainId: 4,
    name: networkNames[4],
  },
}

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  256: '',
  97: '',
  56: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
}

export const GRAPH_HEALTH_ENDPOINT = 'https://api.thegraph.com/index-node/graphql'

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  MAINNET_RPC_URL: 'mainnet-rpc-url',
  HECO_RPC_URL: 'heco-rpc-url',
  XDAI_RPC_URL: 'xdai-rpc-url',
  BSC_RPC_URL: 'bsc-rpc-url',
  BSC_TESTNET_RPC_URL: 'bsc-testnet-rpc-url',
  POLYGON_TESTNET_RPC_URL: 'polygon-testnet-rpc-url',
  POLYGON_RPC_URL: 'polygon-rpc-url',
  ROPSTEN_TESTNET_RPC_URL: 'ropsten-testnet-rpc-url',
  RINKEBY_TESTNET_RPC_URL: 'rinkeby-testnet-rpc-url',
  KOVAN_RPC_URL: 'kovan-rpc-url',
  SOKOL_RPC_URL: 'sokol-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
  DISABLE_BALANCE_WHILE_TOKEN_FETCH: 'disable-balance-while-token-fetch',
  BRIDGE_DIRECTION: 'bridge-direction',
}
