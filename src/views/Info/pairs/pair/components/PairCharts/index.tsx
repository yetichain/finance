import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import ChartsCard from 'views/Info/components/ChartsCard'
import { usePairChartsQuery } from 'views/Info/generated'
import { ChartEntry, PairQueryData } from 'views/Info/types'

export interface PairChartsProps {
  pair: PairQueryData
}

export default function PairCharts({ pair }: PairChartsProps) {
  const { t } = useTranslation()
  const { data } = usePairChartsQuery({
    variables: {
      pairAddress: pair.id,
    },
  })
  const chartsData = useMemo(() => {
    const volume: ChartEntry[] = []
    const liquidity: ChartEntry[] = []
    orderBy(data?.pairDayDatas, 'date').forEach((dayData) => {
      volume.push({
        date: dayData.date,
        value: Number(dayData.dailyVolumeUSD),
      })
      liquidity.push({
        date: dayData.date,
        value: Number(dayData.reserveUSD),
      })
    })
    return {
      volume,
      liquidity,
    }
  }, [data?.pairDayDatas])

  return (
    <PairCharts.Root
      charts={[
        {
          title: t('Volume'),
          data: chartsData.volume,
          type: 'bar',
        },
        {
          title: t('Liquidity'),
          data: chartsData.liquidity,
          type: 'line',
        },
      ]}
    />
  )
}

PairCharts.Root = styled(ChartsCard)`
  min-height: 386px;
`
