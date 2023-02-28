import { CurrencyAmount, JSBI } from '@alium-official/sdk'
import { storeNetwork, useStoreNetwork } from 'store/network/useStoreNetwork'
import { getWeb3NoAccount } from 'utils/web3'
import create from 'zustand'
import createVanilla from 'zustand/vanilla'

export interface StoreAccountState {
  currentAccountAddress: string
  initStoreAccount: () => void
  killStoreAccount: () => void
  showModalConnect: () => void
  modalConnect: boolean
  balance: {
    currencyBalance: CurrencyAmount
    onChain: number
  } | null
  [key: string]: any
  etherBalance: (_account?: string) => Promise<StoreAccountState['balance']>
  clearBalance: () => void
}

// store for usage outside of react
export const storeAccount = createVanilla<StoreAccountState>((set, get) => ({
  balance: null,
  currentAccountAddress: '',
  modalConnect: false,
  // callback for fn in userBlock
  showModalConnect: () => {
    set({ modalConnect: true })
    setTimeout(() => {
      set({ modalConnect: false })
    }, 150)
  },
  initStoreAccount: () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        set({ currentAccountAddress: accounts[0] })
        storeAccount.getState().clearBalance()
      })
    }
  },
  async etherBalance(_account: string) {
    const account = _account
    const chainId = storeNetwork.getState().currentChainId
    const currentBalance = get().balance

    if (account && chainId && (!currentBalance || currentBalance?.onChain !== chainId)) {
      const resBalance = await getWeb3NoAccount()?.eth?.getBalance(account)

      const currencyBalance = CurrencyAmount?.ether(JSBI.BigInt(resBalance?.toString() || '0'), chainId)
      const balance = {
        currencyBalance,
        onChain: chainId,
      }
      set({ balance })
      return balance
    }
    return currentBalance
  },
  clearBalance() {
    set({ balance: null })
  },
  killStoreAccount: () => {
    unsubscribe()
  },
}))

// store for usage inside of react
export const useStoreAccount = create<StoreAccountState>(storeAccount)

// subscribe for changes
const unsubscribe = useStoreAccount.subscribe(
  (currentAccountAddress, prevAccountAddress) =>
    console.info(
      `%c account changed from: "${prevAccountAddress}", to: "${currentAccountAddress}"`,
      'background: #006297; color: #c4ff5c',
    ),
  (state) => state.currentAccountAddress,
)

useStoreNetwork.subscribe(
  (currentChainId, prevChainId) => {
    storeAccount.getState().clearBalance()
  },
  (state) => state.currentChainId,
)
