import { Skeleton } from 'alium-uikit/src'
import Paginate from 'components/Pagination'
import { usePaginate } from 'components/Pagination/hooks/usePaginate'
import { useUserHistory } from 'hooks/bridge/useUserHistory'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import Empty from './Empty'
import HistoryTableHeader from './HistoryTableHeader'
import { HistoryTableItem } from './HistoryTableItem'

const PAGE_LIMIT = 10

export default function HistoryTable() {
  const { transfers, loading } = useUserHistory()
  const directionInDate = useMedia(mq.between(breakpoints.sm, breakpoints.lg))
  const isMobile = useMedia(mq.down(breakpoints.sm))

  const { items, ...paginate } = usePaginate({ items: transfers, pageLimit: PAGE_LIMIT })

  if (loading) {
    return <Skeleton animation='waves' height={200} />
  }

  if (!items.length) {
    return <Empty />
  }

  if (isMobile) {
    return (
      <>
        {items.map((item, key) => (
          <HistoryTable.MobileItem key={key}>
            <HistoryTableHeader />
            <tbody>
              <HistoryTableItem item={item} />
            </tbody>
          </HistoryTable.MobileItem>
        ))}
        <Paginate {...paginate} />
      </>
    )
  }

  return (
    <>
      <HistoryTable.Root>
        <HistoryTableHeader directionInDate={directionInDate} />
        <tbody>
          {items.map((item, key) => (
            <HistoryTableItem directionInDate={directionInDate} key={key} item={item} />
          ))}
        </tbody>
      </HistoryTable.Root>
      <Paginate {...paginate} />
    </>
  )
}

HistoryTable.Root = styled.table`
  width: 100%;
  text-align: left;

  ${HistoryTableItem.Root} {
    border-bottom: 1px solid #ebedf9;
  }
`

HistoryTable.MobileItem = styled.table`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebedf9;
  padding: 16px 0;

  thead {
    background: none;
  }

  tr {
    display: flex;
    flex-direction: column;
    height: 100%;

    & > * + * {
      margin-top: 5px;
    }

    &:hover {
      background: none;
    }
  }

  td,
  th {
    padding: 0;
    height: 30px;
    display: flex;
    align-items: center;
  }

  th {
    text-align: left;
  }

  td {
    justify-content: flex-end;
    text-align: right;
  }
`
