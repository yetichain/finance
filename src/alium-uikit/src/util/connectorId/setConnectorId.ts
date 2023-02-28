import Cookies from 'universal-cookie'
import { connectorLocalStorageKey } from '../../config'
import { getCookieOptions } from '../../config/getCookieOptions'

const cookies = new Cookies()

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

type setConnectorId = (connectorId: typeof ConnectorNames[keyof typeof ConnectorNames] | null) => void

export const setConnectorId: setConnectorId = (connectorId) => {
  cookies.set(connectorLocalStorageKey, connectorId, getCookieOptions())
}
