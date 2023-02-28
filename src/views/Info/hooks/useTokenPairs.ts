import { useMemo } from 'react'
import { useTokenPairsQuery } from '../generated'

export default function useTokenPairs(token?: string) {
  const { data: tokenPairs } = useTokenPairsQuery({
    variables: {
      token,
    },
    skip: !token,
  })

  return useMemo(
    () => tokenPairs && [...tokenPairs.asToken0, ...tokenPairs.asToken1].map((pair) => pair.id),
    [tokenPairs],
  )
}
