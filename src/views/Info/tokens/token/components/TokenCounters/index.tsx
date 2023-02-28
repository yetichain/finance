import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import CounterCard from 'views/Info/components/CounterCard'
import { TokenQueryData } from 'views/Info/types'
import { formatNumber, getPercentChange } from 'views/Info/utils'

export interface TokenCountersProps {
  token: TokenQueryData
}

export default function TokenCounters({ token }: TokenCountersProps) {
  const { t } = useTranslation()
  const [nowData, prevData] = token.tokenDayData

  const liquidity = Number(nowData?.totalLiquidityUSD) || 0
  const liquidityPercent = getPercentChange(Number(prevData?.totalLiquidityUSD) || 0, liquidity)

  const volume24h = Number(nowData?.dailyVolumeUSD) || 0
  const volume24Percent = getPercentChange(Number(prevData?.dailyVolumeUSD) || 0, volume24h)

  const transactions24h = Number(nowData?.dailyTxns) || 0
  const transactions24hPercent = getPercentChange(Number(prevData?.dailyTxns) || 0, transactions24h)

  return (
    <TokenCounters.Root>
      <CounterCard
        title={t('Total Liquidity')}
        value={'$' + formatNumber(liquidity, { notation: 'compact' })}
        percent={liquidityPercent}
      />
      <CounterCard
        title={t('Volume (24 hrs)')}
        value={'$' + formatNumber(volume24h, { notation: 'compact' })}
        percent={volume24Percent}
      />
      <CounterCard
        title={t('Transaction (24 hrs)')}
        value={formatNumber(transactions24h)}
        percent={transactions24hPercent}
      />
    </TokenCounters.Root>
  )
}

TokenCounters.Root = styled.div`
  display: grid;
  gap: 22px;

  @media ${mq.down(breakpoints.md)} {
    grid-auto-flow: column;
    gap: 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    grid-auto-flow: row;
    gap: 8px;
  }
`
