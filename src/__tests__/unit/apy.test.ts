import { formatEther, parseEther } from '@ethersproject/units'
import BigNumber from 'bignumber.js'
// Todo  Jest config, no work imports
export const ALM_PER_BLOCK = new BigNumber(7).multipliedBy(10 ^ 18)
export const BSC_BLOCK_TIME = 3
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365)
export const ALM_PER_YEAR = ALM_PER_BLOCK.times(BLOCKS_PER_YEAR)

export const calcApy = (tokenPrice: number, POOLshare: number, farmLpBalanceBn: BigNumber, priceLpToken: number) => {
  const TOKEN_PER_YEAR = ALM_PER_YEAR
  const farmLpBalance = Number(formatEther(String(farmLpBalanceBn)))

  const apy = (Number(TOKEN_PER_YEAR.dividedBy(POOLshare)) * Number(tokenPrice)) / (farmLpBalance * priceLpToken)
  const apyFixed = Number(apy.toFixed(2))

  console.log('result', apy, '---------------')

  return apyFixed
}

test.skip('Apy calc', () => {
  const tokenPrice = Number(0.11)
  const POOLshare = 38
  const farmLpBalance = new BigNumber(`${parseEther('10')}`)
  const farmLpBalanceToStable = 51.96302002
  const apy = calcApy(Number(tokenPrice), POOLshare, farmLpBalance, farmLpBalanceToStable)
  expect(apy).toBe(1720.57)
})
