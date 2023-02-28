import { CurrencyAmount, JSBI } from '@alium-official/sdk'
import { useEffect, useState } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { getWeb3NoAccount } from 'utils/web3'
import Web3 from 'web3'

const useCurrencyBalance: any = (account: string, web3: Web3): { balance: CurrencyAmount | '0' } => {
  const chainId = useStoreNetwork((state) => state.currentChainId)
  const [balance, setBalance] = useState<CurrencyAmount | '0'>()
  const _web3 = web3 ?? getWeb3NoAccount()
  useEffect(() => {
    if (!account) return
    ;(async () => {
      try {
        const resBalance = await _web3?.eth?.getBalance(account)

        const currencyBalance = CurrencyAmount?.ether(JSBI.BigInt(resBalance?.toString() || '0'), chainId)
        setBalance(currencyBalance)
      } catch (error) {
        setBalance('0')
      }
    })()
  }, [_web3.eth, account, chainId])
  return { balance }
}

export default useCurrencyBalance
