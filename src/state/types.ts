import { Toast } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { CampaignType, FarmConfig, Nft, PoolConfig, Team } from 'config/constants/types'

export type TranslatableText =
  | string
  | {
      id: number
      fallback: string
      data?: {
        [key: string]: string | number
      }
    }
export type SerializedBigNumber = string

export interface PublicFarmData {
  farmLpBalance: number
  multiplier: string
  depositFee: number
  apy: number
  liqudity: number
  lpPrice: BigNumber
  allocPoint: BigNumber
}

export type Farm = Partial<PublicFarmData> &
  FarmConfig & {
    userData?: {
      allowance: string
      tokenBalance: string
      stakedBalance: string
      earnings: string
    }
  }
export type FarmWithUserData = { pid: Farm['pid'] } & Farm['userData']
export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface Profile {
  userId: number
  points: number
  teamId: number
  nftAddress: string
  tokenId: number
  isActive: boolean
  username: string
  nft?: Nft
  team: Team
  hasRegistered: boolean
}

// Slices states

export interface ToastsState {
  data: Toast[]
}

export interface FarmsState {
  data: Farm[]
}

export interface PoolsState {
  data: Pool[]
}

export interface ProfileState {
  isInitialized: boolean
  isLoading: boolean
  hasRegistered: boolean
  data: Profile
  connectionError: any
}

export interface TeamResponse {
  0: string
  1: string
  2: string
  3: string
  4: boolean
}

export interface TeamsById {
  [key: string]: Team
}

export interface TeamsState {
  isInitialized: boolean
  isLoading: boolean
  data: TeamsById
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

export interface AchievementState {
  data: Achievement[]
}

// Global state

export interface State {
  farms: FarmsState
  toasts: ToastsState
  pools: PoolsState
  profile: ProfileState
  teams: TeamsState
  achievements: AchievementState
}
