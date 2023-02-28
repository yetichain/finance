import { Button } from 'alium-uikit/src'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useHasTicket } from 'views/farms/hooks/useFarmTicket'
import BuyTicketModal from './modals/BuyTicketModal'

export const BuyTicketBtn = () => {
  const { t } = useTranslation()
  const [modalOpen, setmodalOpen] = useState(false)
  const { onCheckHasTicket } = useHasTicket()

  const show = () => {
    setmodalOpen(true)
  }

  const onDismiss = async () => {
    setmodalOpen(false)
    await onCheckHasTicket()
  }

  return (
    <>
      <BuyTicketModal modalOpen={modalOpen} onDismiss={onDismiss} />
      <BuyButton onClick={show}>{t('To buy a ticket')}</BuyButton>
    </>
  )
}

// styles

export const BuyButton = styled(Button)`
  background: #1ea76d;

  &:hover {
    background: #3c9c73 !important;
  }
`
