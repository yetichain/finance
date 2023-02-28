import { TransactionIndicateWrapper } from 'components/Modal/transaction/TransactionModal'
import TransferError from 'components/Modal/transaction/TransferError'
import { useBridgeContext } from 'contexts/BridgeContext'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import { BridgeConfirmIcon } from 'images/bridge/BridgeConfirmIcon'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import { useBridgeTransfer } from 'views/bridge/hooks/useBridgeTransfer'
import BridgeTransferLoader from '../Loaders/BridgeTransferLoader'

const TransferStep = () => {
  const [approved, setApproved] = useState(false)

  const { homeChainId } = useBridgeDirection()
  const { providerChainId: chainId } = useWeb3Context()

  const isHome = React.useMemo(() => chainId === homeChainId, [chainId, homeChainId])

  const token = useStoreBridge((state) => state.tokens.fromToken)
  const amount = useStoreBridge((state) => state.amounts.fromAmount)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const connected = useStoreNetwork((state) => state.connected)

  const { networkFrom } = useBridgeNetworks()

  const { loading: loadingTransaction, transactionFailed, setTransactionFailed } = useBridgeContext()
  const transfer = useBridgeTransfer()

  const wrongCurrentNetwork = React.useMemo(
    () => networkFrom?.chainId !== currentChainId,
    [currentChainId, networkFrom],
  )

  const changeStep = storeBridge.getState().changeStep
  const updateStepStatus = storeBridge.getState().updateStepStatus

  // Conditions
  const networkOrAccountErrors = wrongCurrentNetwork || !connected
  const showLoading = loadingTransaction && !networkOrAccountErrors
  const allowCallTransfer = React.useMemo(
    () => Boolean(!networkOrAccountErrors && transfer && !loadingTransaction && !transactionFailed),
    [loadingTransaction, networkOrAccountErrors, transactionFailed, transfer],
  )

  const transferSuccess = React.useMemo(
    () => Boolean(!networkOrAccountErrors && !loadingTransaction && approved && !transactionFailed),
    [approved, loadingTransaction, transactionFailed, networkOrAccountErrors],
  )

  // Actions
  const onFailed = () => {
    setApproved(false)
    return
  }

  const onSuccessHome = () => {
    updateStepStatus(BRIDGE_STEPS.SWITCH_NETWORK, true)
    updateStepStatus(BRIDGE_STEPS.CLAIM_TOKEN, true)
    changeStep(BRIDGE_STEPS.SUCCESS)
    return
  }

  const onSuccessForeign = () => {
    updateStepStatus(BRIDGE_STEPS.TRANSFER, true)
    changeStep(BRIDGE_STEPS.SWITCH_NETWORK)
  }

  // Effects

  // If network valid and connected,  call transfer
  React.useEffect(() => {
    if (allowCallTransfer && !approved) {
      transfer()
        .then((res) => {
          setApproved(true)
        })
        .catch((error) => {
          setApproved(false)
        })
    }
  }, [allowCallTransfer])

  // Waiting for Block Confirmations
  React.useEffect(() => {
    if (transactionFailed) {
      onFailed()
    }
    if (transferSuccess) {
      if (!isHome) {
        onSuccessHome()
      } else {
        onSuccessForeign()
      }
    }
  }, [transferSuccess, isHome, transactionFailed])

  // Validate chainId if current not equal "from" chainId
  React.useEffect(() => {
    if (wrongCurrentNetwork) {
      onFailed()
      setChainId(networkFrom?.chainId)
    }
  }, [wrongCurrentNetwork])

  return (
    <TransferStep.Wrapper>
      {transactionFailed ? (
        <TransferError
          withoutHeader
          onRepeat={() => {
            setTransactionFailed(false)
          }}
        />
      ) : showLoading ? (
        <BridgeTransferLoader token={token} amount={token ? formatBridgeTokenAmount(token, amount) : '0'} />
      ) : (
        <ConfirmMessage />
      )}
    </TransferStep.Wrapper>
  )
}

const ConfirmMessage = () => {
  const { t } = useTranslation()

  return (
    <TransactionIndicateWrapper>
      <TransferStep.StyledConfirm>
        <BridgeConfirmIcon />
        <p>{t('Confirm the transaction in your wallet')}</p>
      </TransferStep.StyledConfirm>
    </TransactionIndicateWrapper>
  )
}

export default TransferStep

// styles

TransferStep.Wrapper = styled.div`
  p {
    margin-top: 8px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

TransferStep.StyledConfirm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #0b1359;
  }
`
