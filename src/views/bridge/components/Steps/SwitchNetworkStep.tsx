import { useWeb3React } from '@web3-react/core'
import { BridgeInfoIcon } from 'images/bridge/BridgeInfoIcon'
import { BridgeSwitchNetworkIcon } from 'images/bridge/BridgeSwitchNetworkIcon'
import { Trans, useTranslation } from 'next-i18next'
import React from 'react'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import { storeNetwork, useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import BridgeBtnWithIcon from '../BridgeBtnWithIcon'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  .message {
    max-width: 350px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 16px;

    b {
      color: #6c5dd3;
    }
  }

  .title {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`

const NetworksIcon = styled.div`
  svg {
    @media screen and (max-width: 768px) {
      width: 147px;
    }
  }
`

const Info = styled.div`
  width: 100%;
  background: #e6e6f6;
  border-radius: 6px;
  display: flex;
  padding: 16px 16px 16px 16px;
  margin-top: 40px;

  img {
    max-width: 24px;
    max-height: 24px;
    margin-right: 16px;
  }

  .message__text {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #0b1359;
    width: max-content;

    @media screen and (max-width: 768px) {
      width: auto;
    }
  }
`

const SwitchNetworkStep = () => {
  const { t } = useTranslation()

  const token = useStoreBridge((state) => state.tokens.fromToken)
  const { networkTo } = useBridgeNetworks()
  const Icon = networkTo?.icon
  const changeStep = storeBridge.getState().changeStep
  const updateStepStatus = storeBridge.getState().updateStepStatus
  const { chainId } = useWeb3React()
  const connected = useStoreNetwork((state) => state.connected)

  const networksEqual = React.useMemo(() => chainId && networkTo?.chainId === chainId, [chainId, networkTo?.chainId])
  const equalAndConnected = React.useMemo(() => networksEqual && connected, [connected, networksEqual])

  React.useEffect(() => {
    if (equalAndConnected) {
      updateStepStatus(BRIDGE_STEPS.SWITCH_NETWORK, true)
      changeStep(BRIDGE_STEPS.CLAIM_TOKEN)
    }
  }, [equalAndConnected])

  const changeNetwork = () => {
    const setChainId = storeNetwork.getState().setChainId
    setChainId(networkTo?.chainId)
  }

  const networkToLabel = networkTo?.label && t(networkTo.label)
  const shortedNetworkLabel = networkToLabel.split(' ')[0]

  return (
    <Wrapper>
      <NetworksIcon>
        <BridgeSwitchNetworkIcon />
      </NetworksIcon>

      <p className='message'>
        <Trans
          i18nKey='Please switch the network in your wallet to <b>{{networkToLabel}}</b>'
          values={{ networkToLabel: networkToLabel }}
          components={{ b: <b /> }}
        />
      </p>
      <BridgeBtnWithIcon onClick={changeNetwork} variant='secondary'>
        <Icon />
        <p className='text'>{networkToLabel}</p>
      </BridgeBtnWithIcon>
      <Info>
        <BridgeInfoIcon />
        <div className='message__text'>
          {t(
            'After you switch networks, you will complete a second transaction on {{shortedNetworkLabel}} to claim your {{tokenSymbol}} tokens.',
            { shortedNetworkLabel, tokenSymbol: token?.symbol },
          )}
        </div>
      </Info>
    </Wrapper>
  )
}

export default SwitchNetworkStep
