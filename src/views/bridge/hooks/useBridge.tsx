import { useBridgeContext } from 'contexts/BridgeContext'
import {
  BRIDGE_STEPS,
  storeBridge,
  storeBridgeDefault,
  StoreBridgeState,
  useStoreBridge,
} from 'store/bridge/useStoreBridge'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { useRefetchBridgeBalances } from './useBridgeBalances'

// init store for current bridge history (CREATE, CONTINUE)
interface Params {
  step?: BRIDGE_STEPS
  showModal?: boolean
  statuses?: StoreBridgeState['stepStatuses']
  from?: number
  to?: number
}
/**
 * Init bridge with store, make install with input params or default from store and uninstall
 */
export const useBridge = () => {
  const { clearTransaction } = useBridgeContext()
  // Store
  const toggleModal = storeBridge.getState().toggleModal
  const changeStep = storeBridge.getState().changeStep
  const setStepStatuses = storeBridge.getState().setStepStatuses
  const setFromNetwork = storeBridge.getState().setFromNetwork
  const setToNetwork = storeBridge.getState().setToNetwork
  const modalOpen = useStoreBridge((state) => state.modalOpen)
  const stepStatuses = useStoreBridge((state) => state.stepStatuses)
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const toNetwork = useStoreBridge((state) => state.toNetwork)
  const toggleNetworks = useStoreBridge((state) => state.toggleNetworks)

  const refetch = useRefetchBridgeBalances()
  const { mutateAllowance } = useBridgeContext()
  // Actions
  const install = ({ step, showModal, statuses, from, to }: Params) => {
    // Params
    const modalActive = showModal !== undefined ? showModal : modalOpen
    const currentStep = step !== undefined ? step : BRIDGE_STEPS.TRANSFER
    const currentStatuses = statuses || stepStatuses
    const fromChainId = from || fromNetwork
    const toChainId = to || toNetwork

    toggleModal(modalActive)
    changeStep(currentStep)
    setStepStatuses(currentStatuses)
    setFromNetwork(fromChainId)
    setToNetwork(toChainId)
  }
  // Reverse operation with REQUIRED all params
  const uninstall = (params: Required<Params>) => {
    install(params)
  }
  // cancel modal
  const cancel = () => {
    const {
      step,
      stepStatuses: statuses,
      fromNetwork: from,
      toNetwork: to,
      modalOpen: showModal,
    } = storeBridgeDefault()
    const currentStep = storeBridge.getState().step
    install({ step, statuses, showModal })
    toggleNetworkIfBeChangedAndClosed(currentStep)
    clearTransaction()
    refetch()
    mutateAllowance()
  }

  const toggleNetworkIfBeChangedAndClosed = (step: BRIDGE_STEPS) => {
    const toNetwork = storeBridge.getState().toNetwork
    const chainId = storeNetwork.getState().currentChainId
    if ((step === BRIDGE_STEPS.SWITCH_NETWORK || step === BRIDGE_STEPS.CLAIM_TOKEN) && toNetwork === chainId) {
      toggleNetworks()
    }
  }
  return { install, uninstall, cancel }
}
