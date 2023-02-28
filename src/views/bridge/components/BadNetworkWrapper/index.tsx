import { Button } from 'alium-uikit/src'
import { ShadowComponent } from 'components/Main/ShadowComponent'
import { CloseItem } from 'components/Modal/transaction/TransactionModal'
import { useBridgeContext } from 'contexts/BridgeContext'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import { BridgeBadNetworkIcon } from 'images/bridge/BridgeBadNetworkIcon'
import { Trans, useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { storeAccount } from 'store/account/useStoreAccount'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { useBridge } from 'views/bridge/hooks/useBridge'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'

interface Props {
  children?: React.ReactNode
  isConnectGuard?: boolean
  show?: boolean
}

const BadNetworkWrapper: FC<Props> = ({ children, isConnectGuard, show = true }) => {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const { cancel } = useBridge()
  const { account } = useActiveWeb3React()

  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const connected = Boolean(useStoreNetwork((state) => state.connected) || account)

  const { networkFrom, networkTo, availableNetworksBridge } = useBridgeNetworks()
  const { toToken, fromToken } = useBridgeContext()

  const IconFrom = networkFrom?.icon
  const IconTo = networkTo?.icon
  const showModalConnect = storeAccount.getState().showModalConnect

  const resolveConnection = async () => {
    if (!connected) {
      showModalConnect()
    } else {
      await logout()
      cancel()
    }
  }

  const showMessage = !availableNetworksBridge.includes(currentChainId) || !account
  const tokensExist = fromToken && toToken

  const networkFromLabel = networkFrom?.label && t(networkFrom.label)
  const networkToLabel = networkTo?.label && t(networkTo.label)

  return (
    <>
      {showMessage && (
        <Wrapper isConnectGuard={isConnectGuard}>
          <Header>{!isConnectGuard && <CloseItem onClick={cancel} />}</Header>
          <Content>
            <BridgeBadNetworkIcon />
            <h2 className='title'>{t('Switch your network')}</h2>
            {tokensExist && (
              <p className='access'>
                <Trans
                  i18nKey='To access the <b>{{fromTokenSymbol}} > {{toTokenSymbol}}</b> bridge, please switch to'
                  values={{ fromTokenSymbol: fromToken.symbol, toTokenSymbol: toToken.symbol }}
                  components={{ b: <b /> }}
                />
              </p>
            )}
            <StyledVariants>
              <Variant>
                {IconFrom && <IconFrom />} <p>{networkFromLabel}</p>
              </Variant>
              {t('or')}
              <Variant>
                {IconTo && <IconTo />} <p>{networkToLabel}</p>
              </Variant>
            </StyledVariants>
            <Button onClick={resolveConnection}>{!connected ? t('Connect') : t('Disconnect')}</Button>
          </Content>
        </Wrapper>
      )}
      <ShadowComponent hide={showMessage}>{children}</ShadowComponent>
    </>
  )
}

export default BadNetworkWrapper

// styles

const Wrapper = styled.div<{ isConnectGuard: boolean }>`
  width: ${(props) => (props.isConnectGuard ? '100%' : '500px')};
  min-height: 363px;
  padding: 8px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Content = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    margin-top: 24px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  b {
    color: #6c5dd3;
  }

  .access {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-top: 4px;
  }
`

const StyledVariants = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 24px;
`

const Variant = styled.div`
  background: #f5f7ff;
  border-radius: 6px;
  display: flex;
  padding: 3px 6px 3px 10px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  margin-left: 6px;

  p {
    margin-left: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`
