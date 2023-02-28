import { ethers } from 'ethers'

export interface Pool {
  withheldFunds: ethers.BigNumber
  leftTracker: ethers.BigNumber
  createdAt: ethers.BigNumber
  withdrawn: ethers.BigNumber
}

export interface User {
  account: string
  balance: ethers.BigNumber
  paid: boolean
  leftId: ethers.BigNumber
}

export interface Withdrawal {
  account: string
  amount: ethers.BigNumber
}

export interface NftReward {
  tokenId: ethers.BigNumber
  amount: ethers.BigNumber
}
