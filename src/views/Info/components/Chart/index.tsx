/* eslint-disable react/no-unstable-nested-components */
import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime'
import { useState } from 'react'
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styled from 'styled-components'
import { ChartEntry } from 'views/Info/types'
import { formatNumber } from 'views/Info/utils'
import ChartInfo, { ChartInfoProps } from './ChartInfo'
import HoverHandler from './HoverHandler'

export interface ChartProps {
  data: ChartEntry[]
  type: 'line' | 'bar'
  title?: ChartInfoProps['title']
}

// TODO: support custom formatters?
export default function Chart({ data, type, title }: ChartProps) {
  const [hovered, setHovered] = useState<number>()
  const xAxisNode = (
    <XAxis
      dataKey='date'
      axisLine={false}
      tickLine={false}
      tickFormatter={(date) => (typeof date === 'number' ? format(fromUnixTime(date), 'dd') : date)}
      minTickGap={10}
      fontSize='11px'
      fontWeight='500'
      letterSpacing='0.1px'
      tickMargin={8}
    />
  )
  const yAxisNode = (
    <YAxis
      dataKey='value'
      tickCount={6}
      scale='linear'
      axisLine={false}
      tickLine={false}
      color='#8990A5'
      fontSize='11px'
      fontWeight='500'
      letterSpacing='0.1px'
      tickFormatter={(val) => '$' + formatNumber(val, { notation: 'compact' })}
      orientation='right'
      tick={{ stroke: '#8990A5', strokeWidth: 0 }}
      tickMargin={8}
    />
  )
  const tooltipNode = (
    <Tooltip
      contentStyle={{ display: 'none' }}
      formatter={(_, __, { payload }: any) => <HoverHandler payload={payload} data={data} onHover={setHovered} />}
    />
  )

  const onMouseLeave = () => setHovered(undefined)

  return (
    <Chart.Root>
      <ResponsiveContainer width='100%' height='100%'>
        {type === 'bar' ? (
          <BarChart data={data} onMouseLeave={onMouseLeave}>
            {xAxisNode}
            {yAxisNode}
            {tooltipNode}
            <Bar barSize={2} dataKey='value' fill='#6C5DD3' />
          </BarChart>
        ) : (
          <AreaChart data={data} onMouseLeave={onMouseLeave}>
            {xAxisNode}
            {yAxisNode}
            {tooltipNode}
            <defs>
              <linearGradient id='Gradient' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='0%' stopColor='#B9B2EA' />
                <stop offset='100%' stopColor='#B9B2EA' stopOpacity='0' />
              </linearGradient>
            </defs>
            <Area type='monotone' dataKey='value' stroke='#6C5DD3' strokeWidth='2' fill='url(#Gradient)' />
          </AreaChart>
        )}
      </ResponsiveContainer>
      <ChartInfo data={data} hovered={hovered} title={title} />
    </Chart.Root>
  )
}

Chart.Root = styled.div`
  position: relative;
`
