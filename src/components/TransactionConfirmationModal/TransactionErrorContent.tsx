import TransferError from 'components/Modal/transaction/TransferError'
import styled from 'styled-components'

interface TransactionErrorContentProps {
  isExchange?: boolean
  onDismiss: () => void
  onRepeat: () => void
}

const StyledTransferError = styled(TransferError)`
  width: 100%;
  min-height: 363px;
`

const TransactionErrorContent = ({ isExchange, onDismiss, onRepeat }: TransactionErrorContentProps) => {
  return <StyledTransferError onRepeat={onRepeat} onClose={onDismiss} withoutWrapper isExchange={isExchange} />
}

export default TransactionErrorContent
