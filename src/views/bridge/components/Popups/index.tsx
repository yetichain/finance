import { BRIDGE_STEPS, useStoreBridge } from 'store/bridge/useStoreBridge'
import BridgeConfirmTransfer from './BridgeConfirmTransfer'
import BridgeTransferProcess from './BridgeTransferProcess'

const PopupsBridge = () => {
  const step = useStoreBridge((state) => state.step)

  return (
    <>
      {BRIDGE_STEPS.CONFIRM_TRANSFER === step && <BridgeConfirmTransfer />}
      {BRIDGE_STEPS.CONFIRM_TRANSFER !== step && <BridgeTransferProcess />}
    </>
  )
}

export default PopupsBridge
