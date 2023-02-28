import { Trade } from '@alium-official/sdk'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { gtmValueToUnitsOfThousands } from 'utils/gtm'

export const swapTradeFormat = (trade: Trade) => {
  return {
    token: `${toSignificantCurrency(trade?.inputAmount)} ${trade?.inputAmount?.currency?.symbol}`,
    value: `${toSignificantCurrency(trade?.outputAmount)} ${trade?.outputAmount?.currency?.symbol}`,
  }
}
export const swapTradeFormatGtm = (trade: Trade) => {
  const sw_token_from_name = trade?.inputAmount?.currency?.symbol
  const sw_token_from_value = gtmValueToUnitsOfThousands(toSignificantCurrency(trade?.inputAmount))
  const sw_token_to_name = trade?.outputAmount?.currency?.symbol
  const sw_token_to_value = gtmValueToUnitsOfThousands(toSignificantCurrency(trade?.outputAmount))
  return {
    sw_token_from_name,
    sw_token_from_value,
    sw_token_to_name,
    sw_token_to_value,
  }
}
