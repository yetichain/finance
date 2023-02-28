import { CheckMarkDoneIcon } from 'alium-uikit/src'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { BRIDGE_STEPS, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'

const BridgeStepsHeader = () => {
  const currentStep = useStoreBridge((state) => state.step)
  const stepStatuses = useStoreBridge((state) => state.stepStatuses)

  const { t } = useTranslation()
  const { providerChainId: chainId } = useWeb3Context()
  const { homeChainId } = useBridgeDirection()
  const hideStepsBar = useMemo(
    () => chainId !== homeChainId && currentStep === BRIDGE_STEPS.TRANSFER,
    [chainId, currentStep, homeChainId],
  )

  const steps = [
    {
      step: BRIDGE_STEPS.TRANSFER,
      title: t('Transfer'),
    },
    {
      step: BRIDGE_STEPS.SWITCH_NETWORK,
      title: t('Switch network'),
    },
    {
      step: BRIDGE_STEPS.CLAIM_TOKEN,
      title: t('Claim token'),
    },
  ]

  return (
    <Header hide={hideStepsBar}>
      {steps.map(({ step, title }) => (
        <Step key={step} active={step === currentStep} success={stepStatuses[step]}>
          <p>
            {step} {t('STEP')}
          </p>
          <div className='title'>
            <h2>{title}</h2>
            {stepStatuses[step] && <CheckMarkDoneIcon />}
          </div>
        </Step>
      ))}
    </Header>
  )
}

export default BridgeStepsHeader

// styles

const Header = styled.div<{ hide: boolean }>`
  display: flex;
  align-items: center;
  ${(props) => props.hide && 'opacity: 0'}
`

const Step = styled.div<{ active: boolean; success: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  cursor: pointer;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    letter-spacing: 1px;
    color: #8990a5;
    padding-bottom: 4px;
  }

  .title {
    white-space: nowrap;
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    transition: 0.3s all ease;
    border-bottom: 1px solid ${(props) => (props.active ? '#6c5dd3' : 'transparent')};

    h2 {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.3px;
      color: ${(props) => (props.success ? '#1EA76D' : '#6c5dd3')};
      margin-right: 7px;
    }
  }
`
