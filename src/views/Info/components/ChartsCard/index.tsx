import { Skeleton } from 'alium-uikit/src'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import { breakpoints, Card, mq } from 'ui'
import Chart, { ChartProps } from '../Chart'
import ResponsiveTabs, { ResponsiveTabsProps } from '../ResponsiveTabs'

export interface ChartsCardProps extends inferStyledProps<typeof ChartsCard['Root']> {
  charts: Array<ChartProps>
  responsiveTabs?: ResponsiveTabsProps['responsive']
}

export default function ChartsCard({ charts, responsiveTabs, ...restProps }: ChartsCardProps) {
  const [tab, setTab] = useState('0')
  const chartIndex = Number(tab)
  const tabs = useMemo(
    () =>
      charts.map((chart, i) => ({
        title: chart.title,
        value: i.toString(),
      })),
    [charts],
  )
  const chart = charts[chartIndex]
  const isVisibleTabs = charts.length > 1
  return (
    <ChartsCard.Root {...restProps}>
      {isVisibleTabs && <ResponsiveTabs responsive={responsiveTabs} value={tab} options={tabs} onChange={setTab} />}
      {chart?.data.length > 0 ? (
        <Chart {...chart} title={isVisibleTabs ? undefined : chart.title} />
      ) : (
        <Skeleton height='100%' />
      )}
    </ChartsCard.Root>
  )
}

ChartsCard.Root = styled(Card)`
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  padding: 24px;
  display: flex;
  flex-direction: column;

  ${ResponsiveTabs.Root} {
    margin-bottom: 17px;
  }

  ${Chart.Root} {
    flex: 1;
  }

  @media ${mq.down(breakpoints.sm)} {
    padding: 16px;
  }
`
