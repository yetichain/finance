import { createContext } from 'react'

export interface PastLotteryDataState {
  mostRecentLotteryNumber: number
  currentLotteryNumber: number
  historyError: boolean
  historyData: Array<any>
}

export default createContext({
  mostRecentLotteryNumber: 0,
  historyError: false,
  historyData: [],
} as PastLotteryDataState)
