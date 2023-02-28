import { ChainId, JSBI, Percent, Token, WETH } from '@alium-official/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { bsc, injected } from 'connectors'
import { newTokenChecksummed } from 'utils/newTokenChecksummed'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

//  BSC Mainnet Basic Tokens
export const DAI = newTokenChecksummed(
  ChainId.MAINNET,
  '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  18,
  'DAI',
  'Dai Stablecoin',
)
export const BUSD = newTokenChecksummed(
  ChainId.MAINNET,
  '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  18,
  'BUSD',
  'Binance USD',
)
export const USDT = newTokenChecksummed(
  ChainId.MAINNET,
  '0x55d398326f99059ff775485246999027b3197955',
  18,
  'USDT',
  'Tether USD',
)
export const EOS = newTokenChecksummed(
  ChainId.MAINNET,
  '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6',
  18,
  'EOS',
  'EOS Token',
)
export const DOT = newTokenChecksummed(
  ChainId.MAINNET,
  '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  18,
  'DOT',
  'Polkadot Token',
)
export const ETH = newTokenChecksummed(
  ChainId.MAINNET,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'ETH',
  'Binance-Peg Ethereum Token',
)
export const WBNB = newTokenChecksummed(
  ChainId.MAINNET,
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  18,
  'WBNB',
  'Wrapped BNB',
)

export const BETH = newTokenChecksummed(
  ChainId.MAINNET,
  '0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B',
  18,
  'BETH',
  'Binance Beacon Ethereum Token',
)
export const BSC_ALM = newTokenChecksummed(
  ChainId.MAINNET,
  '0xC631d214F68e5FD97Fe610736c6692C5533a2F20',
  18,
  'YET',
  'YETI Chain',
)

export const BSC_CAKE = newTokenChecksummed(
  ChainId.MAINNET,
  '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  18,
  'CAKE',
  'PancakeSwap Token',
)

export const TESTBUSD = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47',
  18,
  'BUSD',
  'BUSD(Testnet)',
)
export const TESTWBNB = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  18,
  'WBNB',
  'Wrapped BNB',
)
export const TESTXXX1 = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0xB42A8e21f983A56d1e8D1b8f83CE51A9Eb0241FC',
  18,
  'XXX1',
  'XXX1 Test',
)
export const TESTUSDT = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x1138ebb3101f557b28326a28b6f192c7fecc95f7',
  18,
  'USDT',
  'USDT Test',
)
export const TESTDAI = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x618549d304828c77dcb590d02e3641b03e6f4176',
  18,
  'DAI',
  'DAI Test',
)
export const TESTWETH = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x12BE304f9b7a3B624213b5DBaC1822F75E005DAF',
  18,
  'WETH',
  'WETH Test',
)
//  BSC Testnet Basic Tokens
export const TEST_BSC_ALM = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0xC631d214F68e5FD97Fe610736c6692C5533a2F20',
  18,
  'YET',
  'YETI Chain',
)

export const TEST_BSC_WBNB = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  18,
  'WBNB',
  'Wrapped BNB',
)
export const TEST_BSC_XXX1 = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0xB42A8e21f983A56d1e8D1b8f83CE51A9Eb0241FC',
  18,
  'XXX1',
  'XXX1 Test',
)
export const TEST_BSC_USDT = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x1138ebb3101f557b28326a28b6f192c7fecc95f7',
  18,
  'USDT',
  'USDT Test',
)
export const TEST_BSC_DAI = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x618549d304828c77dcb590d02e3641b03e6f4176',
  18,
  'DAI',
  'DAI Test',
)
export const TEST_BSC_WETH = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x12BE304f9b7a3B624213b5DBaC1822F75E005DAF',
  18,
  'WETH',
  'WETH Test',
)

export const TEST_BSC_ETH_Migration = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0xC5482471187240f38F71CeB8f9AFC2156A0d8f15',
  18,
  'ETH',
  'ETH',
)

export const TEST_BSC_USDT_Migration = newTokenChecksummed(
  ChainId.BSCTESTNET,
  '0x76130226b1411Ca5511Ff3e58ea81Ec8Bb234C7A',
  18,
  'USDT',
  'USDT',
)

//  HECO Mainnet Basic Tokens
export const HECO_USDT = newTokenChecksummed(
  ChainId.HECOMAINNET,
  '0xa71edc38d189767582c38a3145b5873052c3e47a',
  18,
  'USDT',
  'Tether USD',
)
export const HECO_ETH = newTokenChecksummed(
  ChainId.HECOMAINNET,
  '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
  18,
  'ETH',
  'HECO-Peg Ethereum Token',
)

// HECO Testnet Basic Tokens
export const TEST_HECO_WHT = newTokenChecksummed(
  ChainId.HECOTESTNET,
  '0x7aF326B6351C8A9b8fb8CD205CBe11d4Ac5FA836',
  6,
  'WHT',
  'Wrapped HT',
)
export const TEST_HECO_USDT = newTokenChecksummed(
  ChainId.HECOTESTNET,
  '0x6e4Dc12aF5477fCE40F87841dAfdf7156722635e',
  6,
  'USDT',
  'USDT',
)
export const TEST_HECO_USDC = newTokenChecksummed(
  ChainId.HECOTESTNET,
  '0x9a33Ddd074Cd1275DCF6aDe8920675FD8fade75E',
  6,
  'USDC',
  'USDC',
)
export const TEST_HECO_DAI = newTokenChecksummed(
  ChainId.HECOTESTNET,
  '0xc73cbC85C8Df0e7b40Cc05f8B82De4a7ae8F8813',
  6,
  'DAI',
  'DAI',
)
export const TEST_HECO_WBTC = newTokenChecksummed(
  ChainId.HECOTESTNET,
  '0x7bA4b2383255b891D51D1702023904dcEf6d952a',
  6,
  'WBTC',
  'Wrapped BTC',
)
export const TEST_HECO_UNI = newTokenChecksummed(
  ChainId.HECOTESTNET,
  '0x6e4Dc12aF5477fCE40F87841dAfdf7156722635e',
  6,
  'UNI',
  'UNI',
)

export const MATIC_TESTNET_ALM = newTokenChecksummed(
  ChainId.MATIC_TESTNET,
  '0xC631d214F68e5FD97Fe610736c6692C5533a2F20',
  18,
  'YET',
  'YETI chain',
)
export const MATIC_TESTNET_USDT = newTokenChecksummed(
  ChainId.MATIC_TESTNET,
  '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
  18,
  'USDT',
  'Mock USDT',
)
export const MATIC_TESTNET_pegBNB = newTokenChecksummed(
  ChainId.MATIC_TESTNET,
  '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  18,
  'pegBNB',
  'Pegged BNB',
)
export const MATIC_TESTNET_pegSOL = newTokenChecksummed(
  ChainId.MATIC_TESTNET,
  '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
  18,
  'pegSOL',
  'Pegged SOL',
)
export const MATIC_TESTNET_pegDOT = newTokenChecksummed(
  ChainId.MATIC_TESTNET,
  '0x9D35B7afFf83Fd7EA2c9ed16E1C08af27aC07D18',
  18,
  'pegDOT',
  'Pegged DOT',
)
export const MATIC_TESTNET_WMATIC = newTokenChecksummed(
  ChainId.MATIC_TESTNET,
  '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
  18,
  'WMATIC',
  'Wrapped Matic',
)

export const ETHER_TESTNET_ALM = newTokenChecksummed(
  ChainId.ETHER_TESTNET,
  '0xC631d214F68e5FD97Fe610736c6692C5533a2F20',
  18,
  'YET',
  'YETI Chain',
)
export const ETHER_TESTNET_USDT = newTokenChecksummed(
  ChainId.ETHER_TESTNET,
  '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
  18,
  'USDT',
  'TETHER',
)
export const ETHER_TESTNET_pegBNB = newTokenChecksummed(
  ChainId.ETHER_TESTNET,
  '0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11',
  18,
  'pegBNB',
  'Pegged BNB',
)
export const ETHER_TESTNET_pegSOL = newTokenChecksummed(
  ChainId.ETHER_TESTNET,
  '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  18,
  'pegSOL',
  'Pegged SOL',
)
export const ETHER_TESTNET_pegDOT = newTokenChecksummed(
  ChainId.ETHER_TESTNET,
  '0xF92dC46c2F373480cbC7Dacb0A003C4a2c23ea78',
  18,
  'pegDOT',
  'Pegged DOT',
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [TESTWBNB],
  [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
  [ChainId.HECOMAINNET]: [WETH[ChainId.HECOMAINNET]],
  [ChainId.HECOTESTNET]: [WETH[ChainId.HECOTESTNET]],
  [ChainId.ETHER_MAINNET]: [WETH[ChainId.ETHER_MAINNET]],
  [ChainId.ETHER_TESTNET]: [WETH[ChainId.ETHER_TESTNET]],
  [ChainId.MATIC_MAINNET]: [WETH[ChainId.MATIC_MAINNET]],
  [ChainId.MATIC_TESTNET]: [WETH[ChainId.MATIC_TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT, ETH],
  [ChainId.BSCTESTNET]: [TEST_BSC_ALM, TEST_BSC_DAI, TEST_BSC_XXX1, TEST_BSC_USDT, TEST_BSC_WETH],
  [ChainId.HECOMAINNET]: [...WETH_ONLY[ChainId.HECOMAINNET], HECO_USDT, HECO_ETH],
  [ChainId.HECOTESTNET]: [TEST_HECO_DAI, TEST_HECO_USDT, TEST_HECO_USDC],
  [ChainId.MATIC_MAINNET]: [...WETH_ONLY[ChainId.MATIC_MAINNET]],
  [ChainId.MATIC_TESTNET]: [
    MATIC_TESTNET_ALM,
    MATIC_TESTNET_USDT,
    MATIC_TESTNET_pegBNB,
    MATIC_TESTNET_pegSOL,
    MATIC_TESTNET_pegDOT,
    MATIC_TESTNET_WMATIC,
    ...WETH_ONLY[ChainId.MATIC_TESTNET],
  ],
  [ChainId.ETHER_MAINNET]: [...WETH_ONLY[ChainId.ETHER_MAINNET]],
  [ChainId.ETHER_TESTNET]: [
    ETHER_TESTNET_ALM,
    ETHER_TESTNET_USDT,
    ETHER_TESTNET_pegBNB,
    ETHER_TESTNET_pegSOL,
    ETHER_TESTNET_pegDOT,
    ...WETH_ONLY[ChainId.ETHER_TESTNET],
  ],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]: { [tokenAddress: string]: Token[] } } = {
  [ChainId.HECOMAINNET]: {},
  [ChainId.HECOTESTNET]: {},
  [ChainId.MAINNET]: { [ETH.address]: [DAI, WETH[ChainId.MAINNET], BETH] },
  [ChainId.BSCTESTNET]: { [ETH.address]: [TESTDAI, TEST_BSC_ALM, TESTXXX1] },
  [ChainId.MATIC_MAINNET]: {},
  [ChainId.MATIC_TESTNET]: {},
  [ChainId.ETHER_MAINNET]: {},
  [ChainId.ETHER_TESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
  [ChainId.BSCTESTNET]: [
    ...WETH_ONLY[ChainId.BSCTESTNET],
    TEST_BSC_ALM,
    TEST_BSC_XXX1,
    TEST_BSC_USDT,
    TEST_BSC_DAI,
    TEST_BSC_WETH,
  ],
  [ChainId.HECOMAINNET]: [...WETH_ONLY[ChainId.HECOMAINNET], HECO_USDT, HECO_ETH],
  [ChainId.HECOTESTNET]: [
    ...WETH_ONLY[ChainId.HECOTESTNET],
    TEST_HECO_DAI,
    TEST_HECO_USDC,
    TEST_HECO_USDT,
    TEST_HECO_WBTC,
    TEST_HECO_UNI,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, BUSD, USDT],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.BSCTESTNET], TEST_BSC_USDT, TEST_BSC_DAI, TEST_BSC_WETH],
  [ChainId.HECOMAINNET]: [...WETH_ONLY[ChainId.HECOMAINNET], HECO_USDT, HECO_ETH],
  [ChainId.HECOTESTNET]: [...WETH_ONLY[ChainId.HECOTESTNET], TEST_HECO_DAI, TEST_HECO_USDC, TEST_HECO_USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [BSC_CAKE, WBNB],
    [BUSD, USDT],
    [DAI, USDT],
  ],
  [ChainId.BSCTESTNET]: [
    [TEST_BSC_ALM, TEST_BSC_WBNB],
    [TEST_BSC_USDT, TEST_BSC_DAI],
    [TEST_BSC_ETH_Migration, TEST_BSC_USDT_Migration],
  ],
  [ChainId.HECOMAINNET]: [[HECO_USDT, HECO_ETH]],
  [ChainId.HECOTESTNET]: [
    [TEST_HECO_DAI, TEST_HECO_USDT],
    [TEST_HECO_DAI, TEST_HECO_USDC],
  ],
  [ChainId.MATIC_MAINNET]: [],
  [ChainId.MATIC_TESTNET]: [],
  [ChainId.ETHER_MAINNET]: [],
  [ChainId.ETHER_TESTNET]: [],
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  BSC: {
    connector: bsc,
    name: 'Binance Chain Wallet',
    iconName: 'binance.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  // WALLET_CONNECT: {
  //   connector: walletconnect,
  //   name: 'WalletConnect',
  //   iconName: 'walletConnectIcon.svg',
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true
  // },
  // WALLET_LINK: {
  //   connector: walletlink,
  //   name: 'Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Use Coinbase Wallet app on mobile device',
  //   href: null,
  //   color: '#315CF5'
  // },
  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: 'coinbaseWalletIcon.svg',
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   color: '#315CF5',
  //   mobile: true,
  //   mobileOnly: true
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: 'Fortmatic',
  //   iconName: 'fortmaticIcon.png',
  //   description: 'Login using Fortmatic hosted wallet',
  //   href: null,
  //   color: '#6748FF',
  //   mobile: true
  // },
  // Portis: {
  //   connector: portis,
  //   name: 'Portis',
  //   iconName: 'portisIcon.png',
  //   description: 'Login using Portis hosted wallet',
  //   href: null,
  //   color: '#4A6C9B',
  //   mobile: true
  // }
}


// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
