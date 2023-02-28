import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface Params<T> {
  items: T[]
  pageLimit?: number
}
export function usePaginate<T>({ items, pageLimit = 30 }: Params<T>) {
  const itemsMemomize: Params<T>['items'] = useMemo(() => items, [items])

  const sliceItems = useCallback(
    (page: number): Params<T>['items'] => {
      const offset = (page - 1) * pageLimit
      const sliced = itemsMemomize?.length ? itemsMemomize.slice(offset, offset + pageLimit) : []
      return sliced
    },
    [itemsMemomize, pageLimit],
  )

  const [page, setpage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(sliceItems(1))

  useEffect(() => {
    const sliced = sliceItems(page)

    if (itemsPerPage && sliced && !isEqual(itemsPerPage, sliced)) {
      setItemsPerPage(sliced)
    }
  }, [itemsMemomize, itemsPerPage, page, sliceItems])

  const totalRecords = itemsMemomize?.length || 0
  const totalPages = Math.ceil(totalRecords / pageLimit)
  const currentPage = page

  const onPageChanged = (page: number) => {
    setpage(page)
    setItemsPerPage(sliceItems(page))
  }

  return {
    totalPages,
    currentPage,
    onPageChanged,
    items: itemsPerPage,
  }
}
