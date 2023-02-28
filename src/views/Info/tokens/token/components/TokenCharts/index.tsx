import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import ChartsCard from 'views/Info/components/ChartsCard'
import { useTokenChartsQuery } from 'views/Info/generated'
import { ChartEntry } from 'views/Info/types'

export interface TokenChartsProps {
  token: string
}

export default function TokenCharts({ token }: TokenChartsProps) {
  const { t } = useTranslation()
  const { data } = useTokenChartsQuery({
    variables: {
      token,
    },
  })
  const chartsData = useMemo(() => {
    const volume: ChartEntry[] = []
    const liquidity: ChartEntry[] = []
    const price: ChartEntry[] = []
    orderBy(data?.tokenDayDatas, 'date').forEach((dayData) => {
      volume.push({
        date: dayData.date,
        value: Number(dayData.dailyVolumeUSD),
      })
      liquidity.push({
        date: dayData.date,
        value: Number(dayData.totalLiquidityUSD),
      })
      price.push({
        date: dayData.date,
        value: Number(dayData.priceUSD),
      })
    })
    return {
      volume,
      liquidity,
      price,
    }
  }, [data?.tokenDayDatas])
  return (
    <TokenCharts.Root
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
        {
          title: t('Price'),
          data: chartsData.price,
          type: 'line',
        },
      ]}
    />
  )
}

TokenCharts.Root = styled(ChartsCard)`
  min-height: 382px;
`
