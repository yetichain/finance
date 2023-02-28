import { TransactionAddTokenWithSuccess } from 'components/Modal/transaction/TransactionCompleted'
import React from 'react'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { useBridge } from 'views/bridge/hooks/useBridge'

// TODO , checkout logic when bridge work
const SuccessStep = () => {
  const { cancel } = useBridge()
  const toggleNetworks = useStoreBridge((state) => state.toggleNetworks)
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  // current token
  const fromToken = useStoreBridge((state) => state.tokens.fromToken)
  const toToken = useStoreBridge((state) => state.tokens.toToken)
  const token = fromToken?.chainId === currentChainId ? fromToken : toToken
  const amount = useStoreBridge((state) => state.amounts.toAmount)
  const formattedAmount = token ? formatBridgeTokenAmount(token, amount) : '0'

  const txHash = useStoreBridge((state) => state.txHash)

  // Switching is required because we do not do it in step 2
  const needToggle = () => {
    if (currentChainId !== fromNetwork) {
      toggleNetworks()
    }
  }

  React.useEffect(() => {
    needToggle()
  }, [])

  return <TransactionAddTokenWithSuccess cancel={cancel} token={token} txHash={txHash} amount={formattedAmount} />
}

export default SuccessStep
