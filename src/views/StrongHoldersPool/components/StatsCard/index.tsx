import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import FormattedValue from '../FormattedValue'

export interface StatsCardProps {
  title?: ReactNode
  icon?: ReactNode
  content?: ReactNode
  className?: string
}

export default function StatsCard({ title, icon, content, className }: StatsCardProps) {
  return (
    <StatsCard.Root className={className}>
      <StatsCard.Header>
        {icon}
        {title}
      </StatsCard.Header>
      <StatsCard.Content>{content}</StatsCard.Content>
    </StatsCard.Root>
  )
}

StatsCard.Header = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 8px;
  }
`

StatsCard.Content = styled.div`
  flex: 1;
`

StatsCard.Value = styled(FormattedValue)`
  ${typography.big.medium}
  color: #6c5dd3;
`

StatsCard.Root = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;

  & > * + * {
    margin-top: 16px;
  }

  @media ${mq.down(breakpoints.lg)} {
    ${StatsCard.Value} {
      ${typography.large.medium}
    }

    & > * + * {
      margin-top: 8px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    flex-direction: row;
    padding: 16px;
    justify-content: space-between;

    ${StatsCard.Content} {
      flex: initial;
    }

    ${StatsCard.Value} {
      ${typography.ultrasmall.medium}
    }

    & > * + * {
      margin-top: 0;
    }
  }
`
