import { Token } from '@alium-official/sdk'
import { TransactionAddTokenWithSuccess } from 'components/Modal/transaction/TransactionCompleted'

interface TransactionSubmittedContentProps {
  onDismiss: () => void
  hash: string | undefined
  token?: Token
  amount?: string
  hiddenTokenSymbol?: boolean
}

const TransactionSubmittedContent = ({
  onDismiss,
  hash,
  token,
  amount,
  hiddenTokenSymbol,
}: TransactionSubmittedContentProps) => {
  return (
    <TransactionAddTokenWithSuccess
      hiddenTokenSymbol={hiddenTokenSymbol}
      amount={amount || ''}
      txHash={hash}
      cancel={onDismiss}
      token={token}
    />
  )
}

export default TransactionSubmittedContent
