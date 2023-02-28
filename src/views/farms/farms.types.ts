import { Token } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { Farm } from 'state/types'

export type PoolInfoFarmResult = {
  accALMPerShare: BigNumber
  allocPoint: BigNumber
  depositFee: BigNumber
  lastRewardBlock: BigNumber
  lpToken: string
  tokenlockShare: BigNumber
} & PoolNumsArray

type PoolNumsArray = [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]

export interface ColumnsDefTypes {
  id: number
  label: string
  name: string
  sortable: boolean
}

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}

export enum FarmTab {
  'live' = 'live',
  'finished' = 'finished',
}

export enum FarmSortOption {
  // i18n.t('APR')
  'APR' = 'APR',
  // i18n.t('Multiplier')
  'Multiplier' = 'Multiplier',
  // i18n.t('Earned')
  'Earned' = 'Earned',
  // i18n.t('Liquidity')
  'Liquidity' = 'Liquidity',
  // i18n.t('Hot')
  'Hot' = 'Hot',
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 4,
    name: 'liquidity',
    sortable: true,
    label: 'Liquidity',
  },
  {
    id: 5,
    name: 'multiplier',
    sortable: true,
    label: 'Multiplier',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
]

// Display

export interface FarmWithStakedValue extends Farm {
  apr?: number
  lpRewardsApr?: number
}

export interface FarmPair {
  token0: Token
  token1: Token
  pairName?: string
}
