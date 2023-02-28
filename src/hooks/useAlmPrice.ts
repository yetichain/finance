import { getCookieOptions } from 'alium-uikit/src/config/getCookieOptions'
import { fetchTokenPriceFromCoingecko } from 'services/coingecko'
import useSWR from 'swr'
import Cookies from 'universal-cookie'
import { getAlmPrice } from 'utils/prices/getAlmPrice'

const cookies = new Cookies()

export default function useAlmPrice() {
  const { data } = useSWR<string>(
    'useAlmPrice',
    async () => {
      const response = await fetchTokenPriceFromCoingecko('alium-swap')
      const price = response?.data?.market_data?.current_price?.usd

      if (!price) return undefined

      const fixedPrice = Number(price).toFixed(3)
      cookies.set('alm-price', fixedPrice, getCookieOptions())
      return fixedPrice
    },
    {
      refreshInterval: 30000,
      fallbackData: getAlmPrice(),
    },
  )
  return data
}
