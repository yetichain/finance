import { useRouter } from 'next/router'
import { parse, ParsedQs } from 'qs'
import { useMemo } from 'react'

export default function useParsedQueryString(): ParsedQs {
  const { query } = useRouter()
  const search = query?.search as string
  return useMemo(
    () => (search && search.length > 1 ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {}),
    [search],
  )
}
