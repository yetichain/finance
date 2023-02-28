import { BridgeHistoryIcon } from 'images/bridge/BridgeHistoryIcon'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useBridgeBalances } from 'views/bridge/hooks/useBridgeBalances'
import BridgeInput from '../BridgeInput'
import { FromToken } from '../FromToken'
import { ToToken } from '../ToToken'

const HistoryText = () => {
  const { t } = useTranslation()

  return (
    <Link href='/bridge/history' passHref>
      <History>
        <BridgeHistoryIcon />
        <p>{t('History')}</p>
      </History>
    </Link>
  )
}

const BridgeCard = () => {
  useBridgeBalances()
  return (
    <CardContent>
      <HistoryText />
      <FromToken />
      <BridgeInput />
      <ToToken />
    </CardContent>
  )
}

export default BridgeCard

// styles

const CardContent = styled.div`
  height: auto;
  padding: 26px 24px 32px;
`

const History = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #8990a5;
  }

  svg {
    margin-right: 9px;
  }
`
