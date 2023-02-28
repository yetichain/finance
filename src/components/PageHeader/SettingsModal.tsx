import { Modal } from 'alium-uikit/src'
import styled from 'styled-components'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'

const StyledModal = styled.div`
  max-width: 694px;
  width: 100%;
  z-index: inherit;
`

interface SettingsModalProps {
  onDismiss?: () => void
  title: string
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss, title }: SettingsModalProps) => {
  return (
    <StyledModal>
      <Modal title={title} onDismiss={onDismiss}>
        <SlippageToleranceSetting />
        <TransactionDeadlineSetting />
      </Modal>
    </StyledModal>
  )
}

export default SettingsModal
