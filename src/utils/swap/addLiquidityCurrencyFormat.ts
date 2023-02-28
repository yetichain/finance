import { Currency } from '@alium-official/sdk'
import { Field } from 'state/mint/actions'
import { gtmValueToUnitsOfThousands } from 'utils/gtm'

export interface addLiquidityCurrencyFormatPayload {
  formattedAmounts: {
    [x: string]: string
  }
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
}

export const addLiquidityCurrencyFormat = (data: addLiquidityCurrencyFormatPayload) => {
  const { formattedAmounts, currencies } = data
  const lq_token_from_name = currencies[Field.CURRENCY_A]?.symbol
  const lq_token_from_value = gtmValueToUnitsOfThousands(formattedAmounts[Field.CURRENCY_A])
  const lq_token_to_name = currencies[Field.CURRENCY_B]?.symbol
  const lq_token_to_value = gtmValueToUnitsOfThousands(formattedAmounts[Field.CURRENCY_B])
  return {
    // value: toSignificantCurrency(liquidityMinted),
    // token1: `${currencies[Field.CURRENCY_A]?.symbol}`,
    // token2: `${currencies[Field.CURRENCY_B]?.symbol}`,
    lq_token_from_name,
    lq_token_from_value,
    lq_token_to_name,
    lq_token_to_value,
  }
}
