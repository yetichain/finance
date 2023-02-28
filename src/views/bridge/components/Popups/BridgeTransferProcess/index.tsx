import TransactionModal from 'components/Modal/transaction/TransactionModal'
import { BRIDGE_STEPS, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { useBridge } from 'views/bridge/hooks/useBridge'
import BadNetworkWrapper from '../../BadNetworkWrapper'
import BridgeStepsHeader from '../../BridgeStepsHeader'
import ClaimTokenStep from '../../Steps/ClaimTokenStep'
import SuccessStep from '../../Steps/SuccessStep'
import SwitchNetworkStep from '../../Steps/SwitchNetworkStep'
import TransferStep from '../../Steps/TransferStep'

const BridgeTransferProcess = () => {
  const currentStep = useStoreBridge((state) => state.step)
  const { cancel } = useBridge()
  const modalOpen = useStoreBridge((state) => state.modalOpen)

  const onDismiss = () => {
    cancel()
  }

  return (
    <TransactionModal isOpen={modalOpen} onDismiss={onDismiss}>
      <BadNetworkWrapper>
        {currentStep !== BRIDGE_STEPS.SUCCESS && (
          <Wrapper>
            <BridgeStepsHeader />
            {currentStep === BRIDGE_STEPS.TRANSFER && <TransferStep />}
            {currentStep === BRIDGE_STEPS.SWITCH_NETWORK && <SwitchNetworkStep />}
            {currentStep === BRIDGE_STEPS.CLAIM_TOKEN && <ClaimTokenStep />}
          </Wrapper>
        )}
        {currentStep === BRIDGE_STEPS.SUCCESS && <SuccessStep />}
      </BadNetworkWrapper>
    </TransactionModal>
  )
}

export default BridgeTransferProcess

// styles

const Wrapper = styled.div`
  width: 500px;
  min-height: 473px;
  padding: 40px 24px 24px 24px;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 354px;
  }
`
