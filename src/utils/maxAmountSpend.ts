import { CurrencyAmount, JSBI } from '@alium-official/sdk'
import { MIN_ETH } from 'config/settings'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { getCurrencyEther } from './common/getCurrencyEther'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  const { nativeCurrency } = storeNetwork.getState().currentNetwork.providerParams
  const chainId = storeNetwork.getState().currentChainId

  if (!currencyAmount) return undefined
  if (currencyAmount.currency === nativeCurrency) {
    const { calcAmount } = getCurrencyEther(chainId)
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return calcAmount(JSBI.subtract(currencyAmount.raw, MIN_ETH))
    }
    return calcAmount(JSBI.BigInt(0))
  }
  return currencyAmount
}

export default maxAmountSpend
