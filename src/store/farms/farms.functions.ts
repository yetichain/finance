// Pure functions

import { formatEther } from '@ethersproject/units'
import BigNumber from 'bignumber.js'
import { ALM_PER_YEAR } from 'config'

/**
 * Farm lp price(pure)
 * @description Formule for calc lp price - P(LP) = (PtokenA * LPBalance tokenA  + PtokenB * LP Balance tokenB)LP Total Supply
 * @param {PtokenA} - price token A in $(formatted)
 * @param {lpBalanceTokenABn} - token A balance on LP contract address (BigNumber)
 * @param {PtokenB} - price token B in $(formatted)
 * @param {lpBalanceTokenBBn} - token B balance on LP contract address (BigNumber)
 * @param {lpTotalSupplyBn} - total supply LP token (BigNumber)
 */
export const calcFarmLpPrice = (
  PtokenA: number,
  lpBalanceTokenABn: BigNumber,
  PtokenB: number,
  lpBalanceTokenBBn: BigNumber,
  lpTotalSupplyBn: BigNumber,
) => {
  const lpBalanceTokenA = Number(formatEther(String(lpBalanceTokenABn)))
  const lpBalanceTokenB = Number(formatEther(String(lpBalanceTokenBBn)))
  const lpTotalSupply = Number(formatEther(String(lpTotalSupplyBn)))

  const PLP = (PtokenA * lpBalanceTokenA + PtokenB * lpBalanceTokenB) / lpTotalSupply

  console.log('--------------------------- Аргументы к вычислению lp прайса')
  console.log('PtokenA', PtokenA)
  console.log('LPBalance tokenA', lpBalanceTokenA)
  console.log('PtokenB', PtokenB)
  console.log('LP Balance tokenB', lpBalanceTokenB)
  console.log('LP Total Supply', lpTotalSupply)
  console.log('--------------------------- Вычисление ')
  console.log('result', PLP)

  return PLP
}

/**
 * Calc apy(pure)
 * @description Formule for calc apy price - APY = TOKEN per year POOLshare(%) * TOKEN priceFARM LP balance * P(LP)
 * @param {tokenPrice} - price YET in $ (formatted)
 * @param {POOLshare} - Pool Shares% of the total pool value
 * @param {farmLpBalanceBn} - balance lp token on farm (BigNumber)
 * @param {priceLpToken} - price lp in $ (formatted)
 */
export const calcApy = (tokenPrice: number, POOLshare: number, farmLpBalanceBn: BigNumber, priceLpToken: number) => {
  const TOKEN_PER_YEAR = ALM_PER_YEAR
  const farmLpBalance = Number(formatEther(String(farmLpBalanceBn)))
  const POOLsharePercents = POOLshare / 100

  console.log('--------------- apy calc')
  console.log('TOKEN per year', Number(TOKEN_PER_YEAR))
  console.log('TOKEN price(alm)', tokenPrice)
  console.log('POOLshare(%)', POOLsharePercents)
  console.log('FARM LP balance', Number(farmLpBalance))
  console.log('P(LP)', priceLpToken)

  const apy = (Number(TOKEN_PER_YEAR.times(POOLsharePercents)) * Number(tokenPrice)) / (farmLpBalance * priceLpToken)
  const apyFixed = Number(apy.toFixed(2))

  console.log('result', apy, '---------------')
  if (!apyFixed || apyFixed === Infinity) {
    return 0
  }

  return apyFixed
}

export const calcLiqudityLpFarm = (farmLpBalanceToStable: number, farmLpBalance: BigNumber) => {
  const farmLpBalanceTotal = Number(formatEther(String(farmLpBalance)))
  const liqudity = farmLpBalanceTotal * farmLpBalanceToStable
  return new BigNumber(liqudity)
}
