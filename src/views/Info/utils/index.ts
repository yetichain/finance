export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}

export function formatPercent(value: number) {
  return `${value > 0 ? '+' : ''}${formatNumber(Number(value.toFixed(2)))}%`
}

export function getPeriodChange(prevValue: number, currentValue: number) {
  if (currentValue && prevValue) {
    return currentValue - prevValue
  }
  return currentValue || 0
}

export function getPercentChange(prevValue?: number, currentValue?: number) {
  return prevValue && currentValue ? ((currentValue - prevValue) / prevValue) * 100 : 0
}

export function formatTokenSymbol(symbol: string) {
  return symbol.toUpperCase()
}
