import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { breakpoints, mq } from 'ui'
import { LP_HOLDERS_FEE, TOTAL_FEE } from 'views/Info/config'
import { PairTableDataFragment, useTopPairsByIdsQuery, useTopPairsQuery } from 'views/Info/generated'
import useBlock from 'views/Info/hooks/useBlock'
import useTimestamps from 'views/Info/hooks/useTimestamps'
import useTokenPairs from 'views/Info/hooks/useTokenPairs'
import { formatNumber, getPeriodChange } from 'views/Info/utils'
import { getPairName } from 'views/Info/utils/pairs'
import PairCurrencyLogo from '../PairCurrencyLogo'
import Percent from '../Percent'
import Table, { useTableData } from '../Table'
import TableTitle from '../TableTitle'
import TopTokensTable from '../TopTokensTable'

function useTopPairsData(token?: string) {
  const timestamps = useTimestamps()
  const block24h = useBlock(timestamps.h24)
  const block7d = useBlock(timestamps.d7)
  const { data: topPairs } = useTopPairsQuery({
    variables: {
      block24h,
      block7d,
    },
    fetchPolicy: 'no-cache',
    skip: !block24h || !block7d || !!token,
  })

  const ids = useTokenPairs(token)
  const { data: topPairsByIds } = useTopPairsByIdsQuery({
    variables: {
      block24h,
      block7d,
      ids,
    },
    skip: !block24h || !block7d || !token || !ids,
  })

  return token ? topPairsByIds : topPairs
}

function useTopPairsTable(token?: string) {
  const data = useTopPairsData(token)
  const pairs = useMemo(() => {
    if (!data) return undefined
    const [h24ById, d7ById] = [data.h24, data.d7].map((periodPairs) =>
      periodPairs.reduce<Record<string, PairTableDataFragment>>((acc, pair) => {
        acc[pair.id] = pair
        return acc
      }, {}),
    )
    return data.now.map((pair) => {
      const h24Pair = h24ById[pair.id]
      const d7Pair = d7ById[pair.id]

      const liquidity = Number(pair.reserveUSD) || 0

      const currentVolume = Number(pair.volumeUSD) || 0
      const volume24h = getPeriodChange(Number(h24Pair?.volumeUSD) || 0, currentVolume)
      const volume7d = getPeriodChange(Number(d7Pair?.volumeUSD) || 0, currentVolume)

      const fees24h = volume24h * TOTAL_FEE
      const apy = liquidity > 0 ? ((volume24h * LP_HOLDERS_FEE * 365) / liquidity) * 100 : 0

      return {
        id: pair.id,
        name: getPairName(pair.token0.symbol, pair.token1.symbol),
        liquidity,
        volume24h,
        volume7d,
        fees24h,
        apy,

        token0: pair.token0,
        token1: pair.token1,
      }
    })
  }, [data])

  return useTableData({
    items: pairs,
    sortingOptions: {
      initialKey: 'liquidity',
    },
  })
}

export interface TopPairsTableProps {
  hiddenTitle?: boolean
  seeAllHref?: string
  token?: string
}

export default function TopPairsTable({ hiddenTitle, token, seeAllHref }: TopPairsTableProps) {
  const { t } = useTranslation()
  const isTablet = useMedia(mq.down(breakpoints.md))
  const isMobile = useMedia(mq.down(breakpoints.sm))
  const { items, sorting, paginate, getItemNumber } = useTopPairsTable(token)
  return (
    <TopPairsTable.Root>
      {!hiddenTitle && <TableTitle seeAllHref={seeAllHref}>{t('Top Pairs')}</TableTitle>}
      <Table
        paginate={paginate}
        header={
          <Table.HeaderRow>
            {[
              { title: t('Name'), sortKey: 'name' },
              { title: t('Liquidity'), sortKey: 'liquidity' },
              { title: t('Volume (24 hrs)'), sortKey: 'volume24h' },
              !isMobile && { title: t('Volume (7 d)'), sortKey: 'volume7d' },
              !isTablet && { title: t('Fees (24 hr)'), sortKey: 'fees24h' },
              !isTablet && { title: t('1y Fees/\nLiquidity'), sortKey: 'apy' },
            ]
              .filter(Boolean)
              .map((header) => (
                <Table.SortableHeaderCell sortKey={header.sortKey} key={header.title} sorting={sorting}>
                  {header.title}
                </Table.SortableHeaderCell>
              ))}
          </Table.HeaderRow>
        }
      >
        {items ? (
          items.map((item, i) => (
            <Link key={item.id} passHref href={`/info/pairs/${item.token0.id}/${item.token1.id}`}>
              <Table.ItemRow as='a'>
                <Table.ItemCell>
                  {!isMobile && <TopTokensTable.ItemNumber>{getItemNumber(i)}</TopTokensTable.ItemNumber>}
                  <PairCurrencyLogo address0={item.token0.id} address1={item.token1.id} />
                  <TopTokensTable.TokenName>{item.name}</TopTokensTable.TokenName>
                </Table.ItemCell>
                <Table.ItemCell>${formatNumber(item.liquidity)}</Table.ItemCell>
                <Table.ItemCell>${formatNumber(item.volume24h)}</Table.ItemCell>
                {!isMobile && <Table.ItemCell>${formatNumber(item.volume7d)}</Table.ItemCell>}
                {!isTablet && <Table.ItemCell>${formatNumber(item.fees24h)}</Table.ItemCell>}
                {!isTablet && (
                  <Table.ItemCell>
                    <Percent value={item.apy} />
                  </Table.ItemCell>
                )}
              </Table.ItemRow>
            </Link>
          ))
        ) : (
          <Table.ItemsLoader />
        )}
      </Table>
    </TopPairsTable.Root>
  )
}

TopPairsTable.Root = TopTokensTable.Root
