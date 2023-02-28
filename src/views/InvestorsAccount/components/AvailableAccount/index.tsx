import { networksDev, networksProd } from 'alium-uikit/src/widgets/WalletModal/config'
import Binance from 'alium-uikit/src/widgets/WalletModal/icons/Binance'
import { isDev } from 'config'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
  title?: string
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 153px;
  margin-bottom: 153px;
`

const Message = styled.div`
  width: 738px;
  height: 272px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  border-radius: 6px;
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-bottom: 8px;
  }
  p {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-bottom: 32px;
    max-width: 500px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    p {
      font-size: 14px;
    }
  }
`

const Button = styled.button`
  border: 1px solid #6c5dd3;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 14px 24px 14px 24px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  max-width: 303px;
  max-height: 48px;

  p {
    margin: 0;
    padding-left: 16px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
    white-space: nowrap;
  }
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  :hover {
    background-color: #6c5dd3;
    > * {
      color: white;
    }
  }

  > svg {
    fill: #6c5dd3;

    path {
      stroke: #6c5dd3;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    p {
      font-size: 12px;
      white-space: inherit;
    }
  }
`

const AvailableAccount: FC<Props> = ({ children, title }) => {
  const { t } = useTranslation()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const networks = isDev ? networksDev : networksProd
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const setBinanceChain = () => {
    setChainId(networks[0].chainId)
  }
  const availableNetworks = [networksDev[0].chainId, networksProd[0].chainId]
  const available = currentChainId && availableNetworks.includes(currentChainId)
  if (!available) {
    return (
      <Wrapper>
        <Message>
          <h2>{title}</h2>
          <p>{t('This section is only available on Binance Smart Chain. Please switch the network')}</p>
          <Button onClick={setBinanceChain}>
            <Binance />
            <p className='text'>{t('Connect Binance Smart Chain')}</p>
          </Button>
        </Message>
      </Wrapper>
    )
  }
  return <> {children} </>
}

export default AvailableAccount
