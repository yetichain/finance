import BigNumber from 'bignumber.js'

const roundToTwoDp = (number) => Math.round(number * 100) / 100

interface EarnedOfDays {
  earned: number
  date: number
}

export const calculateAlmEarnedPerDollars = (
  numberOfDays: number[],
  farmApy: number,
  almPrice: BigNumber,
  perDollars: number,
) => {
  const result: EarnedOfDays[] = numberOfDays.reduce((earnResult, date) => {
    // Everything here is worked out relative to a year, with the asset compounding daily
    const timesCompounded = 365
    //   We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
    const apyAsDecimal = farmApy / 100
    const daysAsDecimalOfYear = date / timesCompounded
    //   Calculate the starting CAKE balance with a dollar balance of $1000.
    const principal = perDollars / almPrice.toNumber()

    // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
    const finalAmount = principal * (1 + apyAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)

    // To get the cake earned, deduct the amount after compounding (finalAmount) from the starting CAKE balance (principal)
    const interestEarned = finalAmount - principal
    const rounded = roundToTwoDp(interestEarned)
    earnResult.push({ earned: rounded, date })
    return earnResult
  }, [])
  return result
}

export const calculateApyModalRoiByEarnedDates = (earns: EarnedOfDays[], almPrice: BigNumber, perDollars: number) => {
  const calculatedRois = earns.map(({ earned }) => {
    const roiTokens = earned
    const roiAsUSD = roiTokens * almPrice.toNumber()
    return apyModalRoi({ amountEarned: roiAsUSD, amountInvested: perDollars })
  })
  return calculatedRois
}

export const apyModalRoi = ({ amountEarned, amountInvested }) => {
  const percentage = (amountEarned / amountInvested) * 100
  return percentage.toFixed(2)
}

export const formatRoiValuesView = (value: string | number) => {
  let formatted = Number(value)
    ?.toLocaleString('ru', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    ?.substring(0, 14)

  if (formatted[formatted.length - 1] === ',') {
    formatted = formatted.slice(0, -1)
  }

  return formatted
}

export const roiCalculator = (apy: number, poolBalance: number, userBalance: number, lpPriceBusd: number) => {
  const userShares = (100 * userBalance) / poolBalance
  // calc one day
  // const roiDayPercentage = apy / 365
  const roiDayPercentage = apy
  const roiDayBusd = (roiDayPercentage * ((lpPriceBusd * poolBalance * userShares) / 100)) / 100
  return { roiDayPercentage, roiDayBusd }
}
