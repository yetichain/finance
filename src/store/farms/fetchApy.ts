import { Token } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { fetchTokenPriceFromCoingecko } from './../../services/coingecko'
import { getAlmPrice } from './../../utils/prices/getAlmPrice'
import { calcFarmLpPrice } from './farms.functions'

export const lpTokenPriceToStable = async (
  tokenA: Token,
  tokenB: Token,
  lpBalanceTokenA: BigNumber,
  lpBalanceTokenB: BigNumber,
  lpTotalSupply: BigNumber,
) => {
  try {
    const PTokenA = await tokenToStablePrice(tokenA?.symbol)
    const PTokenB = await tokenToStablePrice(tokenB?.symbol)

    const PLP = calcFarmLpPrice(Number(PTokenA), lpBalanceTokenA, Number(PTokenB), lpBalanceTokenB, lpTotalSupply)
    return PLP
  } catch (error) {
    console.error('Failure calc lptokenPrice!', error)
    return 0
  }
}

// Helpers *

const tokenToStablePrice = async (symbol: string): Promise<string> => {
  const cookieAlmPrice = getAlmPrice()
  // defaults tokens list for fetch from coingecko
  const defaultsTokens = {
    ALM: 'yeti-chain',
    ETH: 'ethereum',
    WBNB: 'wbnb',
    CAKE: 'pancakeswap-token',
  }
  // default prices
  const defaultsStables = {
    USDT: '1',
    ALM: cookieAlmPrice || 0,
  }
  if (defaultsStables[symbol]) {
    return defaultsStables[symbol]
  }
  if (defaultsTokens[symbol]) {
    const response = await fetchTokenPriceFromCoingecko(defaultsTokens[symbol])
    const price = response?.data?.market_data?.current_price?.usd

    if (price) {
      const fixedPrice = Number(price).toFixed(3)
      return fixedPrice
    }
    return '0'
  }
  return '0'
}
