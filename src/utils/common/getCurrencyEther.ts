import { BigintIsh, CurrencyAmount } from '@alium-official/sdk'
import { storeNetwork } from './../../store/network/useStoreNetwork'

// Do not user CurrencyAmount.@alium-official/sdk but only return BNB
export const getCurrencyEther = (chainId: number) => {
  const Ether = storeNetwork.getState().currentNetwork.providerParams.nativeCurrency
  const id = chainId || storeNetwork.getState().currentChainId

  const toCurrencyAmount = (amount: BigintIsh) => {
    return CurrencyAmount.ether(amount, id)
    // return CurrencyAmount.@alium-official/sdk(amount)
  }

  return { Ether, calcAmount: toCurrencyAmount }
}
