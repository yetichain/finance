import { TransactionResponse } from '@ethersproject/abstract-signer/node_modules/@ethersproject/abstract-provider'
import BigNumber from 'bignumber.js'
import { Contract } from 'ethers'
import { toWei } from 'utils/bigNumber'

export const stakeFarm = async (masterChefContract: Contract, pid: number, amount) => {
  const tx: TransactionResponse = await masterChefContract.deposit(pid, toWei(new BigNumber(amount || '0')).toString())
  const receipt = await tx.wait()
  if (!receipt.status) {
    throw new Error('transaction was failed')
  }
  return receipt?.transactionHash
}

export const unstakeFarm = async (masterChefContract: Contract, pid, amount) => {
  await harvestFarm(masterChefContract, pid)
  const tx = await masterChefContract.withdraw(pid, toWei(new BigNumber(amount)).toString())
  const receipt = await tx.wait()
  if (!receipt.status) {
    throw new Error('transaction was failed')
  }
  return receipt.status
}

export const harvestFarm = async (masterChefContract: Contract, pid: number) => {
  const tx: TransactionResponse = await masterChefContract.deposit(pid, '0')
  const receipt = await tx.wait()
  if (!receipt.status) {
    throw new Error('transaction was failed')
  }
  return receipt.status
}
