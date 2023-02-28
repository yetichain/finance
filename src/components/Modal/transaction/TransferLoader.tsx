import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { CloseItem, TransactionIndicateWrapper, TransactionWrapper } from './TransactionModal'

const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

interface Props {
  children?: React.ReactNode
  onCancel?: () => void
  withoutHeader?: boolean
  withoutWrapper?: boolean
}
const TransferLoader: FC<Props> = ({ children, onCancel, withoutHeader, withoutWrapper }) => {
  const Wrapper = withoutWrapper ? React.Fragment : TransactionWrapper
  return (
    <Wrapper>
      {!withoutHeader && (
        <Header>
          <CloseItem onClick={onCancel} />
        </Header>
      )}
      <TransactionIndicateWrapper>
        <StyledLoader type='TailSpin' color='#6C5DD3' />
        {children && children}
      </TransactionIndicateWrapper>
    </Wrapper>
  )
}

export default TransferLoader
