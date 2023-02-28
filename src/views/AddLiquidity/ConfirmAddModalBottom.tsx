import { Currency, CurrencyAmount, Fraction, Percent } from '@alium-official/sdk'
import { Button } from 'alium-uikit/src'
import { RowBetween, RowFixed } from 'components/Row'
import { TYPE } from 'components/Shared'
import { useTranslation } from 'next-i18next'
import { Field } from 'state/mint/actions'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import CurrencyLogo from '../../components/CurrencyLogo'

const { body: Body } = TYPE

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()

  return (
    <>
      <RowBetween>
        <Body style={{ color: '#8990A5', padding: '8px', fontSize: '11px' }}>
          {t('{{symbol}} Deposited', { symbol: currencies[Field.CURRENCY_A]?.symbol })}
        </Body>
        <RowFixed style={{ padding: '8px' }}>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Body style={{ fontWeight: '500', fontSize: '11px' }}>
            {toSignificantCurrency(parsedAmounts[Field.CURRENCY_A])}
          </Body>
        </RowFixed>
      </RowBetween>
      <RowBetween style={{ backgroundColor: '#F4F5FA', borderRadius: '6px', padding: '8px' }}>
        <Body style={{ color: '#8990A5', fontSize: '11px' }}>
          {t('{{symbol}} Deposited', { symbol: currencies[Field.CURRENCY_B]?.symbol })}
        </Body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Body style={{ fontWeight: '500', fontSize: '11px' }}>
            {toSignificantCurrency(parsedAmounts[Field.CURRENCY_B])}
          </Body>
        </RowFixed>
      </RowBetween>
      <RowBetween style={{ paddingRight: '8px' }}>
        <Body style={{ color: '#8990A5', padding: '0 8px', fontSize: '11px' }}>{t('Rates')}</Body>
        <Body style={{ fontWeight: '500', fontSize: '11px' }}>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end', paddingRight: '8px' }}>
        <Body style={{ fontWeight: '500', fontSize: '11px' }}>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween style={{ backgroundColor: '#F4F5FA', borderRadius: '6px', padding: '8px' }}>
        <Body style={{ color: '#8990A5', fontSize: '11px' }}>{t('Share of Pool')}:</Body>
        <Body style={{ fontWeight: '500', fontSize: '11px' }}>
          {noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%
        </Body>
      </RowBetween>
      <Button mt='10px' mb='20px' onClick={onAdd} fullwidth>
        {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
