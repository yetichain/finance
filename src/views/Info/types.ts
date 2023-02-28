import { PairByTokensQuery, TokenQuery } from './generated'

export interface ChartEntry {
  value: number
  date: number
}

export type TokenQueryData = NonNullable<TokenQuery['token']>

export type PairQueryData = PairByTokensQuery['pairs'][0]
