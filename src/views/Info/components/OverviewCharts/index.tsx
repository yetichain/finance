import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { useOverviewChartsQuery } from 'views/Info/generated'
import { ChartEntry } from 'views/Info/types'
import ChartsCard from '../ChartsCard'

export default function OverviewCharts() {
  const isTablet = useMedia(mq.down(breakpoints.md))
  const { t } = useTranslation()
  const { data } = useOverviewChartsQuery()
  const chartsData = useMemo(() => {
    const volume: ChartEntry[] = []
    const liquidity: ChartEntry[] = []
    orderBy(data?.aliumDayDatas, 'date').forEach((dayData) => {
      volume.push({
        date: dayData.date,
        value: Number(dayData.dailyVolumeUSD),
      })
      liquidity.push({
        date: dayData.date,
        value: Number(dayData.totalLiquidityUSD),
      })
    }, [])
    return {
      volume,
      liquidity,
    }
  }, [data?.aliumDayDatas])
  return (
    <OverviewCharts.Root>
      {isTablet ? (
        <ChartsCard
          responsiveTabs={false}
          charts={[
            {
              title: t('Liquidity'),
              data: chartsData.liquidity,
              type: 'line',
            },
            {
              title: t('Volume'),
              data: chartsData.volume,
              type: 'bar',
            },
          ]}
        />
      ) : (
        <>
          <ChartsCard
            charts={[
              {
                title: t('Liquidity'),
                data: chartsData.liquidity,
                type: 'line',
              },
            ]}
          />
          <ChartsCard
            charts={[
              {
                title: t('Volume'),
                data: chartsData.volume,
                type: 'bar',
              },
            ]}
          />
        </>
      )}
    </OverviewCharts.Root>
  )
}

OverviewCharts.Root = styled.div`
  display: flex;
  min-height: 342px;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 30px;
  }

  @media ${mq.down(breakpoints.md)} {
    min-height: 394px;
  }

  @media ${mq.down(breakpoints.sm)} {
    min-height: 372px;
  }
`
