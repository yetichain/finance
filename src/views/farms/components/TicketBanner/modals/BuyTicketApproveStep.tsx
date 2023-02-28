import { Button } from 'alium-uikit/src'
import TransferError from 'components/Modal/transaction/TransferError'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useFarmTicket } from 'views/farms/hooks/useFarmTicket'
import { TicketLoadingText } from './BuyTicketModal'

interface Props {
  nextStep: () => void
}

export const BuyTicketApproveStep: FC<Props> = ({ nextStep }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState(false)
  const { approve } = useFarmTicket()

  const onRepeat = () => {
    setLoading(false)
    seterror(false)
  }

  const onApprove = async () => {
    try {
      setLoading(true)
      await approve()
      nextStep()
    } catch (error) {
      seterror(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <TransferLoader withoutWrapper withoutHeader>
        <TicketLoadingText>{t('Confirmation process...')}</TicketLoadingText>
      </TransferLoader>
    )
  }

  if (error) {
    return (
      <TransferError onRepeat={onRepeat} style={{ marginTop: 0 }} withoutHeader withoutWrapper>
        <h2>{t('Transaction failed')}</h2>
        <h3>{t("Your wallet doesn't have enough YET to buy a ticket")}</h3>
      </TransferError>
    )
  }

  return (
    <WrapperApprove>
      <p>{t('Only users who have bought a ticket can take part in the farming program')}</p>
      <h3>{t('Buy ticket for 1500 YET')}</h3>
      <Button onClick={onApprove} disabled={loading}>
        {t('Approve')}
      </Button>
    </WrapperApprove>
  )
}

export default BuyTicketApproveStep

// styles

const WrapperApprove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-bottom: 16px;
  }

  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #0b1359;
    margin-bottom: 32px;
  }
`
