import BigNumber from 'bignumber.js'
import bigNumberConfig from 'config/bignumber'
import { ethers } from 'ethers'
import { User } from './types'

export function formatBigNumber(value: BigNumber) {
  return value.decimalPlaces(4, BigNumber.ROUND_FLOOR).toFormat({
    ...bigNumberConfig.FORMAT,
    groupSeparator: ' ',
  })
}

export function getAllPoolsIds(currentPoolId: ethers.BigNumber): ethers.BigNumber[] {
  const ids: ethers.BigNumber[] = []
  let iterator = currentPoolId
  while (iterator.gte(0)) {
    ids.push(iterator)
    iterator = iterator.sub(1)
  }
  return ids
}

export function isFullPool(users: User[], maxPoolLength: ethers.BigNumber) {
  return maxPoolLength.eq(users.length)
}

export function findUserByAccount(users: User[], account: string) {
  return users.find((user) => user.account === account)
}

export function isUserPaid(user: User) {
  return user.paid
}

export function getPoolAmount(withdrawn: ethers.BigNumber, poolLocked: ethers.BigNumber) {
  return poolLocked.sub(withdrawn)
}

export function formatAddress(address: string, start = 9, end = 5) {
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`
}
