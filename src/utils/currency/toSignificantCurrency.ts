import { CurrencyAmount, JSBI, Price } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from './../formatBalance'

// toSignificant like uniswap
export const toSignificantCurrency = (currency: CurrencyAmount | Price, defaultValue?: string): string => {
  return formatCurrency(currency, 4, defaultValue)
}

const formatCurrency = (currency: CurrencyAmount | Price, sigFigs = 6, defVal?: string) => {
  const defaultValue = defVal || '-'
  const RawBN = currency?.raw && new BigNumber(Number(`${currency.raw}`))
  const amount = currency?.toSignificant(sigFigs)

  const firstMin = '0.0010'

  // Undefined condition
  if ((RawBN && isNaN(Number(getFullDisplayBalance(RawBN)))) || !amount || !currency) {
    return defaultValue
  }

  // Zero condition
  if (currency && !JSBI.greaterThan(currency?.raw as JSBI, JSBI.BigInt(0))) {
    return '0'
  }

  // Minimal zeros is 0.001, checkout - 0.0011 is false and  0.0010 is true
  if (isMinimalAmount(amount, firstMin)) {
    return firstMin.slice(0, -1)
  }

  // Less
  if (parseFloat(Number(amount)?.toFixed(sigFigs)) < 0.0001) {
    return '<0.00001'
  }

  return amount || defaultValue
}

const isMinimalAmount = (amount: string, min: string) => {
  const splitted = amount.split('')
  const zero = min.split('')
  let coincidence = 0
  zero.forEach((z, index) => {
    if (splitted[index] === z) {
      coincidence += 1
    }
  })
  return coincidence === 6
}
