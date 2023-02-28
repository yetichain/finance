import cakeAbi from 'config/abi/cake.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import ERC20_ABI from 'config/abi/erc20.json'
import ifoAbi from 'config/abi/ifo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import { Contract } from 'ethers'
// Addresses
import {
  getAddress,
  getCakeAddress,
  getClaimRefundAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getPointCenterIfoAddress,
} from 'utils/addressHelpers'
import web3NoAccount from 'utils/web3'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

export const getContract2 = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  const contract: unknown = new _web3.eth.Contract(abi as unknown as AbiItem, address)
  return contract as Contract
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract2(ERC20_ABI, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract2(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract2(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract2(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getCakeContract = (web3?: Web3) => {
  return getContract2(cakeAbi, getCakeAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract2(profileABI, getPancakeProfileAddress(), web3)
}
export const getPancakeRabbitContract = (web3?: Web3) => {
  return getContract2(pancakeRabbitsAbi, getPancakeRabbitsAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract2(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract2(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}

export const getClaimRefundContract = (web3?: Web3) => {
  return getContract2(claimRefundAbi, getClaimRefundAddress(), web3)
}
