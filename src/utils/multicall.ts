import { Interface } from '@ethersproject/abi'
import MULTICALL_FUNC_ABI from 'config/abi/MULTICALL_FUNC_ABI.json'
import MULTICALL_ADDRESS from 'config/addresses/MULTICALL_ADDRESS'
import { Contract } from 'ethers'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { getEthersProvider } from 'utils/bridge/providers'
import { getWeb3NoAccount } from 'utils/web3'
import { AbiItem } from 'web3-utils'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

const multicall = async (abi: any[], calls: Call[], chain?: number) => {
  const web3 = getWeb3NoAccount()
  const { currentChainId } = storeNetwork.getState()
  const chainId = chain || currentChainId
  const multi = new web3.eth.Contract(MULTICALL_FUNC_ABI as unknown as AbiItem, MULTICALL_ADDRESS[chainId])
  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])

  try {
    return await multi.methods.aggregate(calldata).call()
    // const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  } catch (e) {
    console.error('multicall error:', e)
  }
}

export const multicallDecoder = (abi: any[], calls: Call[], returnData: any[]): any[] => {
  const itf = new Interface(abi)
  return returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
}

export const multicallWithDecoder = async <T = any>(abi: any[], calls: Call[]): Promise<T> => {
  try {
    const { currentChainId } = storeNetwork.getState()
    const chainId = currentChainId
    const ethersProvider = await getEthersProvider(chainId)
    const multi = new Contract(MULTICALL_ADDRESS[chainId], MULTICALL_FUNC_ABI, ethersProvider)
    const itf = new Interface(abi)
    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multi.aggregate(calldata)
    const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

    return res
  } catch (error) {
    throw new Error(error)
  }
}

export default multicall
