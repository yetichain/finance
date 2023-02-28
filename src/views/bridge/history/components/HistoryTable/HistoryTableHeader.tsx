import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

export interface HistoryTableHeaderProps {
  directionInDate?: boolean
}

export default function HistoryTableHeader({ directionInDate }: HistoryTableHeaderProps) {
  const { t } = useTranslation()
  const headers = [
    t('Date'),
    !directionInDate && t('Direction'),
    t('Sending tx'),
    t('Receiving tx'),
    t('Amount'),
    t('Status'),
  ].filter(Boolean)
  return (
    <HistoryTableHeader.Root>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </HistoryTableHeader.Root>
  )
}

HistoryTableHeader.Root = styled.thead`
  background: #ebedf9;

  th {
    padding: 16px;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #0b1359;
    vertical-align: middle;

    &:first-of-type {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-of-type {
      text-align: right;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  @media ${mq.down(breakpoints.lg)} {
    & > th {
      padding: 16px 8px;
    }
  }
`
