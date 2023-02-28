import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { SerializedBigNumber } from 'state/types'

export const ethersToSerializedBigNumber = (ethersBn: ethers.BigNumber): SerializedBigNumber =>
  ethersToBN(ethersBn).toJSON()

export const ethersToBN = (ethersBn: ethers.BigNumber): BigNumber => new BigNumber(ethersBn.toString())

export function toWei(ether: BigNumber) {
  return ether.times(DEFAULT_TOKEN_DECIMAL)
}

export function toEther(wei: BigNumber) {
  return wei.dividedBy(DEFAULT_TOKEN_DECIMAL)
}
