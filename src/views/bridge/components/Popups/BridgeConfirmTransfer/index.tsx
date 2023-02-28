import { Button } from 'alium-uikit/src'
import TransactionModal, { CloseItem } from 'components/Modal/transaction/TransactionModal'
import { BridgeWarningInDetail } from 'images/bridge/BridgeWarningInDetail'
import { Trans, useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { ChevronRight } from 'react-feather'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { ethersToBN } from 'utils/bigNumber'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { useBridge } from 'views/bridge/hooks/useBridge'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import BadNetworkWrapper from '../../BadNetworkWrapper'

const BridgeConfirmTransfer = () => {
  const { t } = useTranslation()
  const token = useStoreBridge((state) => state.tokens.fromToken)
  const { install } = useBridge()
  const toggleModal = storeBridge.getState().toggleModal
  const modalOpen = useStoreBridge((state) => state.modalOpen)
  const from = useStoreBridge((state) => state.amounts.fromAmount)
  const to = useStoreBridge((state) => state.amounts.toAmount)
  const fee = useMemo(() => {
    if (from.gt(0)) {
      const fromBn = ethersToBN(from)
      const toBn = ethersToBN(to)
      return fromBn.minus(toBn).div(fromBn).multipliedBy(100).toString()
    }

    return 0
  }, [from, to])
  const amounts = {
    from: formatBridgeTokenAmount(token, from),
    to: formatBridgeTokenAmount(token, to),
  }
  const { networkFrom, networkTo } = useBridgeNetworks()

  const onDismiss = () => {
    toggleModal(false)
  }
  const confirm = () => {
    install({ step: BRIDGE_STEPS.TRANSFER })
  }

  const networkToLabel = networkTo?.label && t(networkTo.label)
  const networkFromLabel = networkFrom?.label && t(networkFrom.label)

  return (
    <TransactionModal isOpen={modalOpen} onDismiss={onDismiss}>
      <BadNetworkWrapper>
        <Wrapper>
          <Header>
            <h2 className='title'>{t('Confirm Transfer')}</h2>
            <div onClick={onDismiss}>
              <CloseItem />
            </div>
          </Header>
          <Content>
            <TokensBridge>
              <Token align='left' justify='start'>
                <div className='text'>
                  <h3 className='count'>{amounts.from}</h3>
                  <div className='symbol'>{token?.symbol}</div>
                </div>
              </Token>
              <Fees>
                <div className='chevron'>
                  <ChevronRight />
                </div>
                <p>{t('Bridge Fees {{fee}}%', { fee: fee.toString() })}</p>
              </Fees>
              <Token align='right' justify='end'>
                <div className='text'>
                  <h3 className='count'>{amounts.to}</h3>
                  <div className='symbol'>{token?.symbol}</div>
                </div>
              </Token>
            </TokensBridge>
            <Detail>
              <Trans
                i18nKey='Please confirm that you would like to send <b>{{amountsFrom}} {{tokenSymbol}}</b> from {{networkFromLabel}} and receive <b>{{amountsTo}} {{tokenSymbol}}</b> on {{networkToLabel}}'
                values={{
                  amountsFrom: amounts?.from,
                  amountsTo: amounts?.to,
                  tokenSymbol: token?.symbol,
                  networkFromLabel,
                  networkToLabel,
                }}
                components={{ b: <b /> }}
              />
            </Detail>
            <Info>
              <BridgeWarningInDetail />
              <p>
                {t(
                  `The claim process requires 2 transactions, one on {{networkFromLabel}} and one on {{networkToLabel}}`,
                  { networkFromLabel, networkToLabel },
                )}
              </p>
            </Info>
          </Content>
          <Footer>
            <Button variant='secondary' onClick={onDismiss} className='dismiss'>
              {t(`Cancel`)}
            </Button>
            <Button onClick={confirm} className='continue'>
              {t(`Continue`)}
            </Button>
          </Footer>
        </Wrapper>
      </BadNetworkWrapper>
    </TransactionModal>
  )
}

export default BridgeConfirmTransfer

// styles

const Wrapper = styled.div`
  max-width: 500px;
`

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f4f5fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Content = styled.div`
  padding: 32px 24px 16px 24px;
`

const TokensBridge = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 24px;
`

const Token = styled.div<{ align: 'left' | 'right'; justify: 'end' | 'start' }>`
  width: 50%;
  height: 120px;
  background: #f4f5fa;
  border: 1px solid #f4f5fa;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  align-items: center;

  ${(props) => `padding-${props.align}: 24px`};

  @media screen and (max-width: 768px) {
    ${(props) => `padding-${props.align}: 16px`};
  }

  @media screen and (max-width: 480px) {
    ${(props) => `padding-${props.align}: 10px`};
  }

  ${(props) => `justify-content: flex-${props.justify}`};

  .count {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-right: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    @media screen and (max-width: 768px) {
      font-size: 24px;
    }

    @media screen and (max-width: 480px) {
      margin: 0;
    }
  }

  .symbol {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    position: relative;
    bottom: 4px;

    @media screen and (max-width: 768px) {
      bottom: 8px;
    }
  }

  .text {
    display: flex;
    align-items: flex-end;
    max-width: 175px;

    @media screen and (max-width: 768px) {
      /* max-width: 165px; */
    }

    @media screen and (max-width: 480px) {
      max-width: 120px;
    }

    @media screen and (max-width: 375px) {
      max-width: 110px;
    }

    @media screen and (max-width: 330px) {
      max-width: 90px;
    }
  }
`

const Fees = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;

  .chevron {
    background: #ffffff;
    box-shadow: 0 6px 8px rgba(220, 224, 244, 0.56);
    border-radius: 36px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 32px;
      height: 32px;
      stroke: #6c5dd3;
    }
  }

  p {
    margin-top: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`

const Detail = styled.div`
  margin-bottom: 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #0b1359;

  b {
    font-weight: 500;
    color: #6c5dd3;
  }
`

const Info = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 16px;
  background: rgba(255, 77, 0, 0.1);
  border-radius: 6px;

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #0b1359;
    max-width: 360px;
    padding-left: 18px;
  }

  svg {
    min-width: 24px;
    min-height: 24px;
  }

  @media screen and (max-width: 480px) {
    padding: 16px 5px 16px 16px;
  }
`

const Footer = styled.div`
  padding: 0 24px 32px 24px;
  display: flex;
  justify-content: space-between;

  .dismiss {
    width: 97px;
    height: 48px;
  }

  .continue {
    height: 48px;
    width: 112px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 24px 24px 24px;
  }
`
