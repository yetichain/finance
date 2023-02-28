import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { ethersToBN, toEther } from 'utils/bigNumber'
import { useCurrentPoolId, usePoolAccountUser, useRewardTokenSymbol } from 'views/StrongHoldersPool/hooks'
import { PoolIcon } from 'views/StrongHoldersPool/icons'
import StatsCard from '../StatsCard'
import Title from '../Title'
import { ReactComponent as CheckIcon } from './check.svg'

export default function MyPoolAmountCard() {
  const { t } = useTranslation()
  const rewardTokenSymbol = useRewardTokenSymbol()
  const { data: currentPoolId } = useCurrentPoolId()
  const accountUser = usePoolAccountUser(currentPoolId)
  const value = useMemo(() => accountUser && toEther(ethersToBN(accountUser.balance)), [accountUser])

  if (!value) {
    return null
  }

  return (
    <MyPoolAmountCard.Root
      icon={<PoolIcon />}
      title={
        <MyPoolAmountCard.Title>
          <Title>{t('My pool amount')}</Title>
          <MyPoolAmountCard.Check>
            <CheckIcon />
            <Title>{t('You are in the Pool')}</Title>
          </MyPoolAmountCard.Check>
        </MyPoolAmountCard.Title>
      }
      content={<StatsCard.Value value={value} tokenSymbol={rewardTokenSymbol} />}
    />
  )
}

MyPoolAmountCard.Check = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 6px;
  }
`

MyPoolAmountCard.Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

MyPoolAmountCard.Root = styled(StatsCard)`
  background: #1ea76d;
  color: #fff;

  ${Title},
  ${StatsCard.Value},
  svg {
    color: inherit;
  }

  @media ${mq.down(breakpoints.lg)} {
    ${MyPoolAmountCard.Check} {
      display: none;
    }
  }
`
