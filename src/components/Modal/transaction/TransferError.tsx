import { Button } from 'alium-uikit/src'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import { BridgeTransferErrorIcon } from 'images/bridge/BridgeTransferErrorIcon'
import { useTranslation } from 'next-i18next'
import React from 'react'
import styled from 'styled-components'
import { CloseItem, TransactionIndicateWrapper } from './TransactionModal'

interface Props {
  isExchange?: boolean
  children?: React.ReactNode
  onRepeat: () => void
  className?: string
  style?: React.CSSProperties
  withoutHeader?: boolean
  withoutWrapper?: boolean
  onClose?: () => void
}

const TransferError: FC<Props> = ({
  isExchange,
  onRepeat,
  className,
  style,
  withoutWrapper,
  withoutHeader,
  onClose,
  children,
}) => {
  const Wrapper = withoutWrapper ? Div : TransactionIndicateWrapper
  const { t } = useTranslation()

  return (
    <Wrapper className={className || ''} style={style || {}}>
      {!withoutHeader && (
        <Header>
          <CloseItem onClick={onClose} />
        </Header>
      )}
      <Error>
        <Icon>
          <BridgeTransferErrorIcon />
        </Icon>

        {children ? (
          children
        ) : (
          <>
            <h2>{t('Transaction failed')}</h2>
          </>
        )}
        <Button onClick={onRepeat}>{t('Repeat')}</Button>
      </Error>
    </Wrapper>
  )
}

export default TransferError

// styles

const Error = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-top: 24px;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  h3 {
    margin-top: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  button {
    margin-top: 24px;
  }
`

const Icon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 77, 0, 0.1);
  border-radius: 50px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  padding: 8px;
`

const Div = styled.div``
