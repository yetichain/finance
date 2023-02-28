import { FC } from 'react'
import { SvgProps } from '../../components/Svg/types'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

export type Login = (connectorId: ConnectorNames) => Promise<void>

export enum WalletShowOn {
  anywhere = 'anywhere',
  mobile = 'mobile',
  desktop = 'desktop',
}
export interface WalletsConfig {
  title: string
  icon: FC<SvgProps>
  connectorId: ConnectorNames
  showOn?: WalletShowOn
  networkBlacklist?: number[]
}

export interface NetworksConfig {
  label: string
  title: string
  chainId: any
  icon: FC<SvgProps>
  supportConnectors: ConnectorNames[]
  direction: string
}
