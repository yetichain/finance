import { Button } from 'alium-uikit/src'
import { ShadowComponent } from 'components/Main/ShadowComponent'
import TransferError from 'components/Modal/transaction/TransferError'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { useBridgeContext } from 'contexts/BridgeContext'
import { useClaim, WrongNetworkError } from 'hooks/bridge/useClaim'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useState } from 'react'
import { useToast } from 'state/hooks'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'

interface ClaimLoadProps {
  loading: boolean
  children: React.ReactNode
}

const ClaimLoadWrap: FC<ClaimLoadProps> = ({ loading, children }) => {
  const loadingText = useStoreBridge((state) => state.transactionText)
  const { t } = useTranslation()

  return (
    <>
      {loading && (
        <TransferLoader withoutHeader withoutWrapper>
          <ClaimTokenStep.ClaimWrap>
            <h2>{t('Claim pending...')}</h2>
            <p>{loadingText || t('2 minutes left')}</p>
          </ClaimTokenStep.ClaimWrap>
        </TransferLoader>
      )}
      <ShadowComponent hide={loading}>{children}</ShadowComponent>
    </>
  )
}

const ClaimTokenStep = () => {
  const txHash = useStoreBridge((state) => state.txHash)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const updateStepStatus = storeBridge.getState().updateStepStatus
  const changeStep = storeBridge.getState().changeStep
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const toNetwork = useStoreBridge((state) => state.toNetwork)
  const toggleNetworks = useStoreBridge((state) => state.toggleNetworks)
  const transactionMessage = useStoreBridge((state) => state.transactionMessage)
  const { loading: loadingTransaction } = useBridgeContext()
  const { t } = useTranslation()

  const claim = useClaim()

  const { toastError } = useToast()

  const claimTokens = useCallback(async () => {
    setLoading(true)
    try {
      const tx = await claim(txHash, transactionMessage)
      await tx.wait()
      updateStepStatus(BRIDGE_STEPS.CLAIM_TOKEN, true)
      changeStep(BRIDGE_STEPS.SUCCESS)
    } catch (manualClaimError) {
      console.log(manualClaimError)
      if (manualClaimError instanceof WrongNetworkError) {
        toggleNetworks()
      } else {
        manualClaimError?.message && toastError(manualClaimError?.message)
      }
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [txHash, loading, claim, toggleNetworks, transactionMessage])

  // If network changed
  React.useEffect(() => {
    if (currentChainId !== toNetwork) {
      updateStepStatus(BRIDGE_STEPS.SWITCH_NETWORK, false)
      changeStep(BRIDGE_STEPS.SWITCH_NETWORK)
    }
  }, [currentChainId, toNetwork])

  if (error) {
    return (
      <TransferError
        withoutHeader
        onRepeat={() => {
          setError(false)
        }}
      />
    )
  }

  return (
    <ClaimLoadWrap loading={loading || loadingTransaction}>
      <ClaimTokenStep.Wrapper>
        <p className='title'>{t('Just one more step!')}</p>
        <Button onClick={claimTokens} disabled={!txHash || loading}>
          {t('Claim')}
        </Button>
      </ClaimTokenStep.Wrapper>
    </ClaimLoadWrap>
  )
}

export default ClaimTokenStep

// styles

ClaimTokenStep.Wrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    max-width: 350px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  button {
    margin-top: 24px;
  }

  input {
    &:active,
    &:focus {
      box-shadow: none !important;
    }
  }
`

ClaimTokenStep.ClaimWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 24px;
  }

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
