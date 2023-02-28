import { Currency, Token } from '@alium-official/sdk'
import { storeNetwork } from 'store/network/useStoreNetwork'

export function currencyId(currency: Currency): string {
  const { nativeCurrency } = storeNetwork.getState().currentNetwork.providerParams
  if (currency === nativeCurrency) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
