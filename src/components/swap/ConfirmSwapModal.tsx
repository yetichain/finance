import { currencyEquals, Trade } from '@alium-official/sdk'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../TransactionConfirmationModal'
import SwapModalFooter from './SwapModalFooter'
import SwapModalHeader from './SwapModalHeader'

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA: Trade, tradeB: Trade): boolean {
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !currencyEquals(tradeA.outputAmount.currency, tradeB.outputAmount.currency) ||
    !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  )
}

export default function ConfirmSwapModal({
  trade,
  originalTrade,
  onAcceptChanges,
  allowedSlippage,
  onConfirm,
  onDismiss,
  recipient,
  swapErrorMessage,
  isOpen,
  attemptingTxn,
  txHash,
  onRepeat,
}: {
  isOpen: boolean
  trade: Trade | undefined
  originalTrade: Trade | undefined
  attemptingTxn: boolean
  txHash: string | undefined
  recipient: string | null
  allowedSlippage: number
  onAcceptChanges: () => void
  onConfirm: () => void
  swapErrorMessage: string | undefined
  onDismiss: () => void
  onRepeat: () => void
}) {
  const { t } = useTranslation()
  const showAcceptChanges = useMemo(
    () => Boolean(trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)),
    [originalTrade, trade],
  )

  const modalHeader = useCallback(() => {
    return trade ? (
      <SwapModalHeader
        trade={trade}
        allowedSlippage={allowedSlippage}
        recipient={recipient}
        showAcceptChanges={showAcceptChanges}
        onAcceptChanges={onAcceptChanges}
      />
    ) : null
  }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade])

  const modalBottom = useCallback(() => {
    return trade ? (
      <SwapModalFooter
        onConfirm={onConfirm}
        trade={trade}
        disabledConfirm={showAcceptChanges}
        swapErrorMessage={swapErrorMessage}
        allowedSlippage={allowedSlippage}
      />
    ) : null
  }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade])

  // text to show while loading
  const pendingText = t('Swapping {{inputAmount}} {{inputSymbol}} for {{outputAmount}} {{outputSymbol}}', {
    inputAmount: toSignificantCurrency(trade?.inputAmount),
    inputSymbol: trade?.inputAmount?.currency?.symbol,
    outputAmount: toSignificantCurrency(trade?.outputAmount),
    outputSymbol: trade?.outputAmount?.currency?.symbol,
  })

  // for transaction modal success
  const amount = t('{{inputAmount}} {{inputSymbol}} for {{outputAmount}} {{outputSymbol}}', {
    inputAmount: toSignificantCurrency(trade?.inputAmount),
    inputSymbol: trade?.inputAmount?.currency?.symbol,
    outputAmount: toSignificantCurrency(trade?.outputAmount),
    outputSymbol: trade?.outputAmount?.currency?.symbol,
  })

  // swap to token
  const token = trade?.route.pairs[0]?.token1

  const confirmationContent = useMemo(
    () => (
      <ConfirmationModalContent
        title={t('Confirm Swap')}
        onDismiss={onDismiss}
        topContent={modalHeader}
        bottomContent={modalBottom}
      />
    ),
    [onDismiss, modalBottom, modalHeader],
  )

  return (
    <TransactionConfirmationModal
      onDismiss={onDismiss}
      hasError={Boolean(swapErrorMessage)}
      onRepeat={onRepeat}
      amount={amount}
      isOpen={isOpen}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      content={confirmationContent}
      pendingText={pendingText}
      hiddenTokenSymbol
      token={token}
    />
  )
}
