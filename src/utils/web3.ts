import { ExternalProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { storeNetwork } from 'store/network/useStoreNetwork'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

// always return current
export const getWeb3NoAccount = () => {
  const { currentNetwork } = storeNetwork.getState()
  const httpProviderOptions: HttpProviderOptions = { timeout: 10000 }
  const httpProvider = new Web3.providers.HttpProvider(currentNetwork.rpcUrl, httpProviderOptions)
  const web3NoAccount = new Web3(httpProvider)
  return web3NoAccount
}

export const getEthersProvider = () => {
  const web3: { currentProvider: unknown } = getWeb3NoAccount()
  return new ethers.providers.Web3Provider(web3.currentProvider as ExternalProvider)
}

const web3NoAccount = getWeb3NoAccount()

export default web3NoAccount
