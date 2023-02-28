import { Token } from '@alium-official/sdk'
import { SwapModal } from 'components/Modal/SwapModal'
import { useActiveWeb3React } from 'hooks'
import { ReactNode } from 'react'
import ConfirmationPendingContent from './ConfirmationPendingContent'
import TransactionErrorContent from './TransactionErrorContent'
import TransactionSubmittedContent from './TransactionSubmittedContent'

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: ReactNode
  attemptingTxn: boolean
  pendingText: string
  token?: Token
  amount?: string
  hasError: boolean
  hiddenTokenSymbol?: boolean
  onRepeat: () => void
}

const TransactionConfirmationModal = ({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  token,
  amount,
  hasError,
  onRepeat,
  hiddenTokenSymbol,
}: ConfirmationModalProps) => {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <SwapModal isOpen={isOpen} onDismiss={onDismiss}>
      {hasError ? (
        <TransactionErrorContent onRepeat={onRepeat} onDismiss={onDismiss} isExchange />
      ) : attemptingTxn ? (
        <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          hiddenTokenSymbol={hiddenTokenSymbol}
          amount={amount}
          token={token}
          hash={hash}
          onDismiss={onDismiss}
        />
      ) : (
        content
      )}
    </SwapModal>
  )
}

export default TransactionConfirmationModal
