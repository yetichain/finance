import { ConnectButton } from 'alium-uikit/src/widgets/Menu/ConnectButton'
import { ShadowComponent } from 'components/Main/ShadowComponent'
import { useActiveWeb3React } from 'hooks'
import { BridgeConnectWalletIcon } from 'images/bridge/BridgeConnectWalletIcon'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { storeAccount } from 'store/account/useStoreAccount'
import { BRIDGE_STEPS, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import BadNetworkWrapper from '../BadNetworkWrapper'

const BridgeConnectWallet: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const showModalConnect = storeAccount.getState().showModalConnect
  const step = useStoreBridge((state) => state.step)
  const withNetworkGuard = React.useMemo(() => step === BRIDGE_STEPS.CONFIRM_TRANSFER, [])
  const accountExist = Boolean(account)

  return (
    <>
      {!accountExist && (
        <CardContent>
          <IconWrap>
            <BridgeConnectWalletIcon />
          </IconWrap>
          <h2>{t('Connect Wallet')}</h2>
          <p>{t('To get started, connect your wallet.')}</p>
          <ConnectButton isAccount={!!account} accountEllipsis='' onClick={showModalConnect} />
        </CardContent>
      )}
      <ShadowComponent hide={!accountExist}>
        <BadNetworkWrapper isConnectGuard={withNetworkGuard} show={accountExist}>
          {children}
        </BadNetworkWrapper>
      </ShadowComponent>
    </>
  )
}
export default BridgeConnectWallet

// styles

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 424px;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    padding-bottom: 8px;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
    padding-bottom: 24px;
  }

  @media screen and (max-width: 500px) {
    height: 304px;
  }
`

const IconWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`
