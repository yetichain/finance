import { Token } from '@alium-official/sdk'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { ChevronRight } from 'react-feather'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink, useExplorerName } from 'utils'
import AddTokenBtn from '../../../components/Buttons/AddTokenBtn'
import { CloseItem, TransactionWrapper } from './TransactionModal'

interface MainProps {
  children?: React.ReactNode
  cancel?: () => void
  withoutHeader?: boolean
  withoutWrapper?: boolean
}

interface Props {
  cancel: () => void
  amount?: string | number
  token?: Token
  hiddenTokenSymbol?: boolean
  txHash: string
}

const TransactionCompleted: FC<MainProps> = ({ cancel, children, withoutHeader, withoutWrapper }) => {
  const Wrapper = withoutWrapper ? React.Fragment : TransactionWrapper
  const params = withoutWrapper ? {} : { id: 'transaction_wrapper' }

  return (
    <Wrapper {...params}>
      {!withoutHeader && (
        <Header>
          <CloseItem onClick={cancel} />
        </Header>
      )}
      <ContentWrapper>
        <BridgeSuccessIcon />
      </ContentWrapper>
      {children && children}
    </Wrapper>
  )
}

export const TransactionAddTokenWithSuccess: FC<Props> = ({ cancel, hiddenTokenSymbol, amount, token, txHash }) => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const link = getExplorerLink(currentChainId, txHash, 'transaction')
  const { explorerName } = useExplorerName(currentChainId)
  const { t } = useTranslation()

  return (
    <TransactionCompleted cancel={cancel}>
      <Content>
        <h2 className='title'>{t('Transaction completed')}</h2>
        <p>
          {t('Amount')}{' '}
          <b>
            {amount} {!hiddenTokenSymbol && token?.symbol}
          </b>
        </p>
        {txHash && (
          <ViewOnWrapper>
            <a href={link} target='_blank'>
              {t('Transaction completed', { explorerName })}
              <ChevronRight />
            </a>
          </ViewOnWrapper>
        )}
        <AddTokenBtn token={token} />
      </Content>
    </TransactionCompleted>
  )
}

export default TransactionCompleted

// styles

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ViewOnWrapper = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #6c5dd3;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    stroke: #6c5dd3;
    width: 18px;
    height: 16px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Content = styled(ContentWrapper)`
  margin-top: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;

  .title {
    margin-top: 24px;
  }

  .amount {
    margin-top: 4px;
  }

  b {
    color: #1ea86d;
  }
`
