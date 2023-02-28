import { ChainId } from '@alium-official/sdk'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import fromUnixTime from 'date-fns/fromUnixTime'
import { useTranslation } from 'next-i18next'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { getExplorerLink } from 'utils'
import { formatNumber, formatTokenSymbol } from 'views/Info/utils'
import { TransactionData, TransactionType } from 'views/Info/utils/transactions'
import { formatAddress } from 'views/StrongHoldersPool/utils'
import Table from '../Table'

export interface TransactionRowProps {
  transaction: TransactionData
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const { t } = useTranslation()
  const isTablet = useMedia(mq.down(breakpoints.md))
  let name: string
  const token0 = formatTokenSymbol(transaction.token0Symbol)
  const token1 = formatTokenSymbol(transaction.token1Symbol)

  if (transaction.type === TransactionType.MINT) {
    name = t('Add {{token0}} and {{token1}}', {
      token0,
      token1,
    })
  } else if (transaction.type === TransactionType.SWAP) {
    name = t('Swap {{token0}} for {{token1}}', {
      token0: transaction.amountToken1 < 0 ? token0 : token1,
      token1: transaction.amountToken0 < 0 ? token0 : token1,
    })
  } else if (transaction.type === TransactionType.BURN) {
    name = t('Remove {{token0}} and {{token1}}', {
      token0,
      token1,
    })
  }
  return (
    <Table.ItemRow
      as='a'
      target='_blank'
      rel='noreferrer noopener'
      href={getExplorerLink(ChainId.MAINNET, transaction.hash, 'transaction')}
    >
      <Table.ItemCell>
        <TransactionRow.Name>{name}</TransactionRow.Name>
      </Table.ItemCell>
      <Table.ItemCell>${formatNumber(transaction.amountUSD)}</Table.ItemCell>
      {!isTablet && (
        <>
          <Table.ItemCell>
            {formatNumber(Math.abs(transaction.amountToken0))} {token0}
          </Table.ItemCell>
          <Table.ItemCell>
            {formatNumber(Math.abs(transaction.amountToken1))} {token1}
          </Table.ItemCell>
          <Table.ItemCell>
            <TransactionRow.Account>{formatAddress(transaction.sender, 6, 4)}</TransactionRow.Account>
          </Table.ItemCell>
        </>
      )}
      <Table.ItemCell>
        {formatDistanceToNowStrict(fromUnixTime(transaction.timestamp), {
          addSuffix: true,
        })}
      </Table.ItemCell>
    </Table.ItemRow>
  )
}

TransactionRow.Name = styled.div`
  ${typography.ultrasmall.medium}
  color: #6C5DD3;
`

TransactionRow.Account = styled.div`
  color: #6c5dd3;
`
