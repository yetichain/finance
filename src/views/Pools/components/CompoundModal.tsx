import { Button, Modal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import ModalActions from 'components/ModalActions'
import useI18n from 'hooks/useI18n'
import { FC, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface DepositModalProps {
  earnings: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const CompoundModal: FC<DepositModalProps> = ({ earnings, onConfirm, onDismiss, tokenName = '' }) => {
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(earnings)
  }, [earnings])

  return (
    <Modal
      title={`${TranslateString(704, 'Compound')} ${TranslateString(330, `${tokenName} Earned`)}`}
      onDismiss={onDismiss}
    >
      <BalanceRow>
        <Balance value={Number(fullBalance)} />
      </BalanceRow>
      <ModalActions>
        <Button fullwidth variant='secondary' onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          id='compound-cake'
          fullwidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(fullBalance)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, t('Pending Confirmation')) : TranslateString(464, t('Confirm'))}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default CompoundModal
