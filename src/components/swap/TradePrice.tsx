import { Price } from '@alium-official/sdk'
import { SyncAltIcon, Text } from 'alium-uikit/src'
import { useTranslation } from 'react-i18next'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { StyledBalanceMaxMini } from './styleds'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? toSignificantCurrency(price) : toSignificantCurrency(price?.invert())
  const { t } = useTranslation()

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} ${t('per')} ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} ${t('per')} ${price?.quoteCurrency?.symbol}`

  return (
    <Text fontSize='14px' style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', color: '#6C5DD3' }}>
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <SyncAltIcon width='20px' color='primary' />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
