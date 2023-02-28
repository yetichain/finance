import TransactionModal, { CloseItem } from 'components/Modal/transaction/TransactionModal'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import BuyTicketApproveStep from './BuyTicketApproveStep'
import BuyTicketBuyStep from './BuyTicketBuyStep'

interface Props {
  modalOpen: boolean
  onDismiss: () => void
}

const BuyTicketModal: FC<Props> = ({ modalOpen, onDismiss }) => {
  const [buyStep, setBuyStep] = useState(false)

  const nextStep = () => {
    setBuyStep(true)
  }

  const backStep = () => {
    setBuyStep(false)
  }

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = () => {
        onDismiss()
        backStep()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  return (
    <TransactionModal isOpen={modalOpen} onDismiss={onDismiss}>
      <Wrapper>
        <Header>
          <div onClick={onDismiss}>
            <CloseItem />
          </div>
        </Header>
        <div>{buyStep ? <BuyTicketBuyStep /> : <BuyTicketApproveStep nextStep={nextStep} />}</div>
      </Wrapper>
    </TransactionModal>
  )
}

export default BuyTicketModal

// styles

const Wrapper = styled.div`
  width: 354px;
  margin-bottom: 63px;
`

const Header = styled.div`
  padding: 16px;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
`

export const TicketLoadingText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin-top: 24px;
`
