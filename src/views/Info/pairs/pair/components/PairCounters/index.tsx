import { Skeleton } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import CounterCard from 'views/Info/components/CounterCard'
import CurrencyLogo from 'views/Info/components/CurrencyLogo'
import { usePairCountersQuery } from 'views/Info/generated'
import { PairQueryData } from 'views/Info/types'
import { formatNumber, formatTokenSymbol, getPercentChange } from 'views/Info/utils'

export interface PairCountersProps {
  pair: PairQueryData
}

export default function PairCounters({ pair }: PairCountersProps) {
  const { t } = useTranslation()
  const { data } = usePairCountersQuery({
    variables: {
      pairAddress: pair.id,
    },
  })

  if (!data) {
    return <Skeleton />
  }

  const [now, prev] = data.pairDayDatas

  const liquidity = Number(now?.reserveUSD) || 0
  const liquidityChange = getPercentChange(Number(prev.reserveUSD) || 0, liquidity)

  const volume24h = Number(now?.dailyVolumeUSD) || 0
  const volume24hChange = getPercentChange(Number(prev.dailyVolumeUSD) || 0, volume24h)

  const transactions24h = Number(now?.dailyTxns) || 0
  const transactions24hChange = getPercentChange(Number(prev.dailyTxns) || 0, transactions24h)

  return (
    <PairCounters.Root>
      <CounterCard title={t('Total Liquidity')} value={'$' + formatNumber(liquidity)} percent={liquidityChange} />
      <CounterCard title={t('Volume (24 hrs)')} value={'$' + formatNumber(volume24h)} percent={volume24hChange} />
      <CounterCard
        title={t('Transaction (24 hrs)')}
        value={formatNumber(transactions24h)}
        percent={transactions24hChange}
      />
      <CounterCard
        title={t('Pooled Tokens')}
        value={
          <PairCounters.Tokens>
            <div>
              <CurrencyLogo address={pair.token0.id} />
              {formatNumber(now?.reserve0 || 0) + ' ' + formatTokenSymbol(pair.token0.symbol)}
            </div>
            <div>
              <CurrencyLogo address={pair.token1.id} />
              {formatNumber(now?.reserve1 || 0) + ' ' + formatTokenSymbol(pair.token1.symbol)}
            </div>
          </PairCounters.Tokens>
        }
      />
    </PairCounters.Root>
  )
}

PairCounters.Tokens = styled.div`
  display: grid;
  gap: 8px;
  ${typography.ultrasmall.medium};
  color: #0b1359;

  & > div {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: start;
    gap: 8px;
  }

  @media ${mq.down(breakpoints.sm)} {
    grid-auto-flow: column;
    justify-content: start;
  }
`

PairCounters.Root = styled.div`
  display: grid;
  gap: 16px;

  @media ${mq.down(breakpoints.lg)} {
    gap: 8px;
  }

  @media ${mq.down(breakpoints.md)} {
    grid-auto-flow: column;
    gap: 16px;
  }

  @media ${mq.down(breakpoints.sm)} {
    grid-auto-flow: row;
    gap: 8px;
  }
`
