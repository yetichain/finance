import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import Percent from 'views/Info/components/Percent'

export interface CounterCardProps {
  title: ReactNode
  value: ReactNode
  percent?: number
}

export default function CounterCard({ title, value, percent }: CounterCardProps) {
  return (
    <CounterCard.Root>
      <CounterCard.Title>{title}</CounterCard.Title>
      {typeof value === 'string' ? <CounterCard.Value>{value}</CounterCard.Value> : value}
      {percent !== undefined && <CounterCard.Percent value={percent} />}
    </CounterCard.Root>
  )
}

CounterCard.Value = styled.div`
  ${typography.h6}
  color: #0B1359;
`

CounterCard.Title = styled.div`
  ${typography.ultrasmall.medium}
  color: #8990A5;
`

CounterCard.Percent = styled(Percent)`
  ${typography.ultrasmall.regular}
`

CounterCard.Root = styled(Card)`
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  padding: 16px;
  display: grid;
  gap: 8px;

  @media ${mq.down(breakpoints.sm)} {
    align-items: end;
    justify-content: space-between;

    ${CounterCard.Percent} {
      grid-column: 2;
      grid-row: 1 / span 2;
    }
  }
`
