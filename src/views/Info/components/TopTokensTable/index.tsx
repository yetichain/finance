import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { formatNumber } from 'utils/formatBalance'
import { useTopTokensQuery } from 'views/Info/generated'
import { formatTokenSymbol, getPercentChange } from 'views/Info/utils'
import CurrencyLogo from '../CurrencyLogo'
import Percent from '../Percent'
import Table, { useTableData } from '../Table'
import TableTitle from '../TableTitle'

function useTopTokensTable() {
  const { data } = useTopTokensQuery()
  const tokens = useMemo(() => {
    if (!data) return undefined
    return data.tokens.map((token) => {
      const price = Number(token.tokenDayData[0]?.priceUSD) || 0
      const prevPrice = Number(token.tokenDayData[1]?.priceUSD) || 0
      return {
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        liquidity: Number(token.tokenDayData[0]?.totalLiquidityUSD) || 0,
        volume24h: Number(token.tokenDayData[0]?.dailyVolumeUSD) || 0,
        price,
        priceChange: getPercentChange(prevPrice, price),
      }
    })
  }, [data])
  return useTableData({
    items: tokens,
    sortingOptions: {
      initialKey: 'liquidity',
    },
  })
}

export interface TopTokensTableProps {
  hiddenTitle?: boolean
  seeAllHref?: string
}

export default function TopTokensTable({ hiddenTitle, seeAllHref }: TopTokensTableProps) {
  const { t } = useTranslation()
  const { items, paginate, sorting, getItemNumber } = useTopTokensTable()
  const isTablet = useMedia(mq.down(breakpoints.md))
  const isMobile = useMedia(mq.down(breakpoints.sm))
  return (
    <TopTokensTable.Root>
      {!hiddenTitle && <TableTitle seeAllHref={seeAllHref}>{t('Top Tokens')}</TableTitle>}
      <Table
        paginate={paginate}
        header={
          <Table.HeaderRow>
            {[
              { title: t('Name'), sortKey: 'name' },
              !isMobile && { title: t('Symbol'), sortKey: 'symbol' },
              { title: t('Liquidity'), sortKey: 'liquidity' },
              { title: t('Volume (24 hrs)'), sortKey: 'volume24h' },
              !isTablet && { title: t('Price'), sortKey: 'price' },
              !isTablet && { title: t('Price Change\n(24 Hrs)'), sortKey: 'priceChange' },
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
          items.map((token, i) => (
            <Link key={token.id} passHref href={`/info/tokens/${token.id}`}>
              <Table.ItemRow as='a'>
                <Table.ItemCell>
                  {!isMobile && <TopTokensTable.ItemNumber>{getItemNumber(i)}</TopTokensTable.ItemNumber>}
                  <CurrencyLogo address={token.id} />
                  <TopTokensTable.TokenName>
                    {isMobile ? formatTokenSymbol(token.symbol) : token.name}
                  </TopTokensTable.TokenName>
                </Table.ItemCell>
                {!isMobile && <Table.ItemCell>{formatTokenSymbol(token.symbol)}</Table.ItemCell>}
                <Table.ItemCell>${formatNumber(token.liquidity)}</Table.ItemCell>
                <Table.ItemCell>${formatNumber(token.volume24h)}</Table.ItemCell>
                {!isTablet && <Table.ItemCell>${formatNumber(token.price)}</Table.ItemCell>}
                {!isTablet && (
                  <Table.ItemCell>
                    <Percent value={token.priceChange} />
                  </Table.ItemCell>
                )}
              </Table.ItemRow>
            </Link>
          ))
        ) : (
          <Table.ItemsLoader />
        )}
      </Table>
    </TopTokensTable.Root>
  )
}

TopTokensTable.Root = styled.div`
  ${Table.Row} {
    grid-template-columns: 1.6fr repeat(5, 1fr);
  }

  @media ${mq.down(breakpoints.md)} {
    ${Table.Row} {
      grid-template-columns: 1.6fr repeat(3, 1fr);
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${Table.Row} {
      grid-template-columns: 1.6fr repeat(2, 1fr);
    }
  }
`

TopTokensTable.ItemNumber = styled.div`
  margin-right: 8px;
  min-width: 16px;
`

TopTokensTable.TokenName = styled.div`
  ${typography.ultrasmall.medium}
  color: #6C5DD3;
  margin-left: 8px;
`
