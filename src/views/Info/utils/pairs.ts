import { formatTokenSymbol } from '.'

export function getPairName(token0: string, token1: string) {
  return formatTokenSymbol(token0) + '-' + formatTokenSymbol(token1)
}
