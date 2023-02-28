import { Percent } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { format, fromUnixTime } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import { typography } from 'ui'

export interface PoolDetailsInfoProps {
  participantNumber?: BigNumber
  createdAt?: BigNumber
  poolShare?: Percent
}

export default function PoolDetailsInfo({ participantNumber, createdAt, poolShare }: PoolDetailsInfoProps) {
  const { t } = useTranslation()
  const formattedCreatedAt = useMemo(
    () => createdAt && format(fromUnixTime(createdAt.toNumber()), 'dd/MM/yyyy, HH:mm:ss'),
    [createdAt],
  )
  return (
    <PoolDetailsInfo.Root>
      {poolShare && (
        <PoolDetailsInfo.Field>
          <span>{t('Pool share')}</span>
          <span>{poolShare.toFixed(2)}%</span>
        </PoolDetailsInfo.Field>
      )}
      {participantNumber && (
        <PoolDetailsInfo.Field>
          <span>{t('Participant number')}</span>
          <span>{participantNumber.toString()}</span>
        </PoolDetailsInfo.Field>
      )}
      {formattedCreatedAt && (
        <PoolDetailsInfo.Field>
          <span>{t('Pool creation date')}</span>
          <span>{formattedCreatedAt}</span>
        </PoolDetailsInfo.Field>
      )}
    </PoolDetailsInfo.Root>
  )
}

PoolDetailsInfo.Root = styled.div``

PoolDetailsInfo.Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;

  &:nth-child(even) {
    background: #f4f5fa;
  }

  & > span {
    ${typography.ultrasmall.medium}

    &:nth-child(1) {
      color: #8990a5;
    }

    &:nth-child(2) {
      color: #0b1359;
    }
  }
`
