import { ChainId, Currency, CurrencyAmount, Token, TokenAmount, WETH } from '@alium-official/sdk'
import { storeNetwork } from 'store/network/useStoreNetwork'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  const { nativeCurrency } = storeNetwork.getState().currentNetwork.providerParams
  // currency === nativeCurrency, not be equal but Object and instance not equal, check by symbol
  // const token =
  //   chainId && currency?.symbol === nativeCurrency?.symbol
  //     ? WETH[chainId]
  //     : currency instanceof Token
  //     ? currency
  //     : undefined
  const isEth = Boolean(currency?.symbol === nativeCurrency?.symbol) || Boolean(currency === nativeCurrency)
  return chainId && isEth ? WETH[chainId] : currency instanceof Token ? currency : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined,
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  const wrapped = token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
  return wrapped
}

export function unwrappedToken(token: Token): Currency {
  const { nativeCurrency } = storeNetwork.getState().currentNetwork.providerParams
  if (token.equals(WETH[token.chainId])) return nativeCurrency
  return token
}
