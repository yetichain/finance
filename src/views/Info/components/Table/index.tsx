import { Skeleton } from 'alium-uikit/src'
import Paginate, { PaginateProps } from 'components/Pagination'
import { usePaginate } from 'components/Pagination/hooks/usePaginate'
import orderBy from 'lodash/orderBy'
import times from 'lodash/times'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import { PAGE_LIMIT } from 'views/Info/config'
import { ReactComponent as ArrowDownIcon } from './assets/arrow-down.svg'

export interface TableProps {
  header: ReactNode
  children: ReactNode
  paginate?: PaginateProps
}

export default function Table({ header, children, paginate }: TableProps) {
  return (
    <Table.Root>
      {header}
      {children}
      {paginate && <Paginate {...paginate} />}
    </Table.Root>
  )
}

Table.Row = styled.div`
  display: grid;
  min-height: 56px;

  & > * {
    padding: 0 16px;

    &:last-child {
      text-align: right;
      justify-content: flex-end;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    & > * {
      padding: 0 8px;
    }
  }
`

Table.HeaderRow = styled(Table.Row)`
  border-radius: 6px;
  overflow: hidden;
`

Table.ItemRow = styled(Table.Row)`
  border-bottom: 1px solid #ebedf9;

  a& {
    &:hover {
      background: rgb(247, 248, 253);
    }
  }
`

Table.Cell = styled.div`
  display: inline-flex;
  align-items: center;
`

Table.HeaderCell = styled(Table.Cell)`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #0b1359;
  white-space: pre-wrap;
  background: #ebedf9;
`

Table.ItemCell = styled(Table.Cell)`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.001em;
  color: #0b1359;

  @media ${mq.down(breakpoints.sm)} {
    ${typography.tiny.regular};
  }
`

Table.Root = styled(Card)`
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  padding: 8px;

  & > .pagination {
    margin-bottom: 24px;
  }
`

export type TableSorting = ReturnType<typeof useTableSorting>

export interface UseTableSortingOptions {
  initialDirection?: 'desc' | 'asc'
  initialKey?: string
}

export function useTableSorting(opts?: UseTableSortingOptions) {
  const [direction, setDirection] = useState(opts?.initialDirection || 'desc')
  const [key, setKey] = useState(opts?.initialKey)
  const toggleDirection = useCallback(() => setDirection((prev) => (prev === 'desc' ? 'asc' : 'desc')), [])
  return {
    direction,
    key,
    setKey,
    setDirection,
    toggleDirection,
  }
}

export interface UseTableDataOptions<T> {
  items: T[] | undefined
  sortFn?: (items: T[], key: TableSorting['key'], direction: TableSorting['direction']) => T[]
  sortingOptions?: UseTableSortingOptions
  pageLimit?: number
}

export function useTableData<T>({
  items,
  sortFn = orderBy,
  pageLimit = PAGE_LIMIT,
  sortingOptions,
}: UseTableDataOptions<T>) {
  const sorting = useTableSorting(sortingOptions)
  const sortedItems = useMemo(() => {
    if (sorting.key && items && sortFn) {
      return sortFn(items, sorting.key, sorting.direction)
    }
    return items
  }, [items, sortFn, sorting.direction, sorting.key])
  const { items: paginatedItems, ...paginate } = usePaginate({ items: sortedItems, pageLimit })
  const getItemNumber = useCallback(
    (i: number) => pageLimit * (paginate.currentPage - 1) + i + 1,
    [pageLimit, paginate.currentPage],
  )
  const setPage = paginate.onPageChanged
  useEffect(() => {
    setPage(1)
    // paginate.onPageChanged isn't memoizated :/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting.key, sorting.direction])
  return {
    items: items && paginatedItems,
    sorting,
    paginate,
    getItemNumber,
  }
}

Table.SortableHeaderCell = styled(
  (props: { children: ReactNode; className?: string; sortKey: string; sorting: TableSorting }) => {
    const isSelected = props.sortKey === props.sorting.key
    return (
      <Table.HeaderCell
        onClick={() => {
          if (isSelected) {
            props.sorting.toggleDirection()
          } else {
            props.sorting.setKey(props.sortKey)
          }
        }}
        as='button'
        className={props.className}
        data-direction={isSelected ? props.sorting.direction : undefined}
      >
        {props.children}
        {isSelected && <ArrowDownIcon />}
      </Table.HeaderCell>
    )
  },
)`
  text-align: left;
  cursor: pointer;
  border: none;

  &:hover {
    background: rgb(228, 230, 247);
  }

  &[data-direction='asc'] {
    svg {
      transform: rotate(180deg);
    }
  }

  & > svg {
    margin-left: 4px;
  }
`

Table.ItemsLoader = styled(({ className }) => (
  <>
    {times(3).map((i) => (
      <Table.ItemRow key={i} className={className}>
        <Skeleton animation='waves' />
      </Table.ItemRow>
    ))}
  </>
))`
  position: relative;

  & > * {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
`
