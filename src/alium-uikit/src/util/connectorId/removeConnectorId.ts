import Cookies from 'universal-cookie'
import { connectorLocalStorageKey } from '../../config'
import { getCookieOptions } from '../../config/getCookieOptions'

const cookies = new Cookies()

type removeConnectorId = () => void

export const removeConnectorId: removeConnectorId = () => {
  cookies.remove(connectorLocalStorageKey, getCookieOptions())
}
