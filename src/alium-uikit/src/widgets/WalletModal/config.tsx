import { isDev } from 'config'
import { bridgeNetworksChains } from 'constants/bridge/bridge.networks'
import { isMobile } from 'react-device-detect'
import Binance from './icons/Binance'
import BinanceChain from './icons/BinanceChain'
import EtherIcon from './icons/EtherIcon'
import Huobi from './icons/Huobi'
import Metamask from './icons/Metamask'
import OntoWallet from './icons/OntoWallet'
import PolygonMatic from './icons/PolygonMatic'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import { ConnectorNames, NetworksConfig, WalletsConfig, WalletShowOn } from './types'

const isWeb3Detect = () => {
  const global: any = process.browser && window
  return Boolean(global?.web3)
}

interface ConnectorArgs {
  browserConnector?: ConnectorNames
  mobileConnector?: ConnectorNames
  mobileAlternativeConnector?: ConnectorNames
}

const connector = (args: ConnectorArgs = {}) => {
  const {
    browserConnector = ConnectorNames.Injected,
    mobileConnector,
    mobileAlternativeConnector = ConnectorNames.WalletConnect,
  } = args

  const web3 = isWeb3Detect()

  const browser = !isMobile && web3
  const mobileWithWeb3 = isMobile && web3
  const mobileWithoutWeb3 = isMobile && !web3

  if (browser) {
    return browserConnector
  }
  if (mobileWithWeb3) {
    // can't detect wallet name, for mobile only walletconnect
    // return ConnectorNames.WalletConnect
    return mobileConnector || ConnectorNames.WalletConnect
  }
  if (mobileWithoutWeb3) {
    return mobileAlternativeConnector
  }
  return null
}

// When load isMobile not working, bad init, fix wallets as function
export const wallets = (): WalletsConfig[] => [
  {
    // i18n.t('Metamask')
    title: 'Metamask',
    icon: Metamask,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
    }),
  },
  {
    // i18n.t('Trust Wallet')
    title: 'Trust Wallet',
    icon: TrustWallet,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
      browserConnector: ConnectorNames.WalletConnect,
    }),
    showOn: WalletShowOn.mobile,
  },
  {
    // i18n.t('Token Pocket')
    title: 'Token Pocket',
    icon: TokenPocket,
    connectorId: connector({
      mobileConnector: ConnectorNames.Injected,
      browserConnector: ConnectorNames.WalletConnect,
    }),
    networkBlacklist: [137, 80001],
  },
  {
    // i18n.t('Wallet Connect')
    title: 'Wallet Connect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    // i18n.t('Binance Chain Wallet')
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: connector({
      mobileConnector: ConnectorNames.WalletConnect,
      mobileAlternativeConnector: ConnectorNames.WalletConnect,
      browserConnector: ConnectorNames.BSC,
    }),
    showOn: WalletShowOn.desktop,
  },
  {
    // i18n.t('ONTO Wallet')
    title: 'ONTO Wallet',
    icon: OntoWallet,
    connectorId: ConnectorNames.WalletConnect,
  },
]

export const networksProd: NetworksConfig[] = [
  {
    // i18n.t('Binance Smart Chain')
    label: 'Binance Smart Chain',
    // i18n.t('Binance')
    title: 'Binance',
    icon: Binance,
    chainId: 56,
    supportConnectors: [ConnectorNames.BSC, ConnectorNames.WalletConnect, ConnectorNames.Injected],
    direction: 'bsc',
  },
  {
    // i18n.t('Huobi ECO Chain')
    label: 'Huobi ECO Chain',
    // i18n.t('Huobi')
    title: 'Huobi',
    icon: Huobi,
    chainId: 128,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'heco',
  },
  {
    // i18n.t('Polygon Matic Chain')
    label: 'Polygon Matic Chain',
    // i18n.t('Polygon')
    title: 'Polygon',
    icon: PolygonMatic,
    chainId: 137,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'polygon',
  },
  {
    // i18n.t('Ethereum Chain')
    label: 'Ethereum Chain',
    // i18n.t('Ethereum')
    title: 'Ethereum',
    icon: EtherIcon,
    chainId: 1,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'eth',
  },
]
export const networksDev: NetworksConfig[] = [
  {
    // i18n.t('Binance Smart Chain')
    label: 'Binance Smart Chain',
    // i18n.t('Binance')
    title: 'Binance',
    icon: Binance,
    chainId: 97,
    supportConnectors: [ConnectorNames.BSC, ConnectorNames.WalletConnect, ConnectorNames.Injected],
    direction: 'bsc',
  },
  {
    // i18n.t('Huobi ECO Chain')
    label: 'Huobi ECO Chain',
    // i18n.t('Huobi')
    title: 'Huobi',
    icon: Huobi,
    chainId: 256,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'heco',
  },
  {
    // i18n.t('Polygon Matic Chain')
    label: 'Polygon Matic Chain',
    // i18n.t('Polygon')
    title: 'Polygon',
    icon: PolygonMatic,
    chainId: 80001,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'polygon_test',
  },
  {
    // i18n.t('Ethereum Chain')
    label: 'Ethereum Chain',
    // i18n.t('Ethereum')
    title: 'Ethereum',
    icon: EtherIcon,
    chainId: 4,
    supportConnectors: [ConnectorNames.Injected, ConnectorNames.WalletConnect],
    direction: 'rinkeby',
  },
]

export const getNetworks = () => {
  return isDev ? networksDev : networksProd
}

export const getBridgeNetworks = (): NetworksConfig[] => {
  const networks = getNetworks()
  return networks.reduce((configs, network) => {
    const exist = bridgeNetworksChains.find((bridge) => bridge === network.chainId)
    if (exist) {
      configs.push(network)
    }
    return configs
  }, [])
}
