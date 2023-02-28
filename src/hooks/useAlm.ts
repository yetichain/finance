import { useActiveWeb3React } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from 'routes'
import { useAllTokens } from './Tokens'

export const useSearchToken = (symbol: string) => {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  const TOKEN = Object.values(tokens).find((token) => token.symbol === symbol && token.chainId === chainId)
  return TOKEN
}
export const useAlmToken = () => {
  return useSearchToken('YET')
}

export const useLiquidityPriorityDefaultAlm = () => {
  const { query, pathname }: any = useRouter()
  const history = useRouter()
  const ALMCurrencyId = useAlmToken()?.address

  useEffect(() => {
    if (query?.currencyIdA === 'ETH' && !query?.currencyIdB && ALMCurrencyId) {
      history.push(ROUTES.addByMultiple('ETH', ALMCurrencyId))
    }
    // ignore lint, need only in first load add page
  }, [ALMCurrencyId, history, query?.currencyIdA, query?.currencyIdB])
}
