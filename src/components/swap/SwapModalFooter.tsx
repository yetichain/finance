import { Trade, TradeType } from '@alium-official/sdk'
import { Button, SwapIcon, Text } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { Field } from 'state/swap/actions'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow, RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { SwapCallbackError } from './styleds'

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <AutoColumn gap='0px' style={{ userSelect: 'none' }}>
        <RowBetween align='center' style={{ padding: '4px 8px' }}>
          <Text fontSize='11px' color='#8990A5'>
            {t('Price')}
          </Text>
          <Text
            fontSize='11px'
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right',
              paddingLeft: '8px',
              fontWeight: 500,
            }}
            color='#0B1359'
          >
            {formatExecutionPrice(trade, showInverted)}
            <SwapIcon onClick={() => setShowInverted(!showInverted)} style={{ marginLeft: '8px', cursor: 'pointer' }} />
          </Text>
        </RowBetween>

        <RowBetween style={{ backgroundColor: '#F4F5FA', borderRadius: '6px', padding: '4px 8px' }}>
          <RowFixed>
            <Text fontSize='11px' color='#8990A5'>
              {trade.tradeType === TradeType.EXACT_INPUT ? t('Minimum received') : t('Maximum sold')}
            </Text>
            <QuestionHelper text={t('Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.')} />
          </RowFixed>
          <RowFixed>
            <Text fontSize='11px' color='#6C5DD3'>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4) ?? '-'
                : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4) ?? '-'}
            </Text>
            <Text fontSize='11px' marginLeft='4px' color='#6C5DD3'>
              {trade.tradeType === TradeType.EXACT_INPUT
                ? trade.outputAmount.currency.symbol
                : trade.inputAmount.currency.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween style={{ padding: '4px 8px' }}>
          <RowFixed>
            <Text fontSize='11px' color='#8990A5'>
              {t('Price Impact')}
            </Text>
            <QuestionHelper text={t('The difference between the market price and your price due to trade size.')} />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>
        <RowBetween style={{ backgroundColor: '#F4F5FA', borderRadius: '6px', padding: '4px 8px' }}>
          <RowFixed>
            <Text fontSize='11px' color='#8990A5'>
              {t('Liquidity Provider Fee')}
            </Text>
            <QuestionHelper text={t('For each trade a 0.25% fee is paid. 0.20% goes to liquidity providers and 0.05% goes to the YETI treasury.')} />
          </RowFixed>
          <Text fontSize='11px' color='#6C5DD3'>
            {realizedLPFee ? `${toSignificantCurrency(realizedLPFee)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </AutoColumn>

      <AutoRow>
        <Button
          onClick={onConfirm}
          disabled={disabledConfirm}
          variant={severity > 2 ? 'danger' : 'primary'}
          mt='10px'
          mb='20px'
          id='confirm-swap-or-send'
          fullwidth
        >
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </Button>

        {swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </AutoRow>
    </>
  )
}
