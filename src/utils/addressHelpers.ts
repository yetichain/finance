import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { storeNetwork } from 'store/network/useStoreNetwork'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const { currentChainId } = storeNetwork.getState()
  return address[currentChainId] ? address[currentChainId] : address[mainNetChainId]
}

export const getCakeAddress = () => {
  return getAddress(addresses.cake)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getFarmingTicketWindow = () => {
  return getAddress(addresses.farmingTicketWindow)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getWbnbAddress = () => {
  return getAddress(addresses.wbnb)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getRabbitMintingFarmAddress = () => {
  return getAddress(addresses.rabbitMintingFarm)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}

export const getShpAddress = () => getAddress(addresses.shp)
