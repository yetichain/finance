import { ChainId } from '@alium-official/sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useEffect, useMemo } from 'react'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { approveTokenToSpender } from 'utils/callHelpers'
import { BSC_ALM, TEST_BSC_ALM } from '../../../constants'
import { useFarmingTicketWindow, useTokenContract } from './../../../hooks/useContract'

export const useFarmTicket = () => {
  const contract = useFarmingTicketWindow()
  const { hasTicket } = useHasTicket()
  const approve = useApproveTicket(contract?.address)

  const buyTicket = async (): Promise<TransactionResponse> => {
    return await contract.buyTicket()
  }
  return { hasTicket, buyTicket, approve }
}

const useApproveTicket = (address: string) => {
  const chainId = useStoreNetwork((state) => state.currentChainId)
  const token = chainId === ChainId.BSCTESTNET ? TEST_BSC_ALM : BSC_ALM
  const { account } = useActiveWeb3React()
  const value = ethers.utils.parseEther('1500')
  const contract = useTokenContract(token?.address)
  const approve = approveTokenToSpender(contract, value, address, account)
  return approve
}

export const useHasTicket = () => {
  const loading = useStoreFarms((state) => state.ticketLoader)
  const hasTicket = useStoreFarms((state) => state.hasTicket)
  const checkHasTicket = useStoreFarms((state) => state.checkHasTicket)
  const { account } = useActiveWeb3React()
  const contract = useFarmingTicketWindow()
  const allowFetch = useMemo(() => (contract && account) || !account, [account, contract])
  const onCheckHasTicket = async () => {
    await checkHasTicket(contract, account)
  }

  useEffect(() => {
    if (allowFetch) {
      onCheckHasTicket()
    }
  }, [allowFetch])
  return { hasTicket, onCheckHasTicket, loading }
}
