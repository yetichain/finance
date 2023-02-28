export interface MigratePair {
  title: string
  symbolA: string
  symbolB: string
  addressA: string
  addressB: string
  addressLP: string
  exchange: string
  balance: number
}

export type MigratePairs = MigratePair[]
