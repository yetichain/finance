import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime'
import styled from 'styled-components'
import { typography } from 'ui'
import { ChartEntry } from 'views/Info/types'
import { formatNumber, getPercentChange } from 'views/Info/utils'
import Percent from '../Percent'

export interface ChartInfoProps {
  hovered?: number
  data: ChartEntry[]
  title?: string
}

export default function ChartInfo({ hovered, data, title }: ChartInfoProps) {
  const entryIndex = hovered ?? data.length - 1
  const entry = data[entryIndex]
  const prevEntry = data[entryIndex - 1]
  return (
    <ChartInfo.Root>
      {title && <ChartInfo.Title>{title}</ChartInfo.Title>}
      {entry && (
        <>
          <ChartInfo.Value>
            <span>${formatNumber(entry.value, { notation: 'compact' })}</span>
            {prevEntry && <Percent value={getPercentChange(prevEntry.value, entry.value)} />}
          </ChartInfo.Value>
          <ChartInfo.Date>{format(fromUnixTime(entry.date), 'MMM d, yyyy')}</ChartInfo.Date>
        </>
      )}
    </ChartInfo.Root>
  )
}

ChartInfo.Root = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  gap: 6px;
  color: #0b1359;
`

ChartInfo.Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.1px;
`

ChartInfo.Value = styled.div`
  & > span:first-child {
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
    letter-spacing: 0.1px;
  }

  ${Percent.Root} {
    margin-left: 8px;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1px;
  }
`

ChartInfo.Date = styled.div`
  ${typography.small.regular}
`
