import { CurrencyAmount } from '@alium-official/sdk'

export const getCurrencyBalance = (currency: CurrencyAmount): string => {
  return currency?.toExact()
}
