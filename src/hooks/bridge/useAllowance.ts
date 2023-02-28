import { Token } from '@alium-official/sdk'
import { ethers } from 'ethers'
import { useTokenContract } from 'hooks/useContract'
import useSWR, { SWRConfiguration } from 'swr'

export default function useAllowance(token?: Token, owner?: string, spender?: string, swrConfig?: SWRConfiguration) {
  const tokenContract = useTokenContract(token?.address, false)
  return useSWR<ethers.BigNumber>(
    tokenContract && owner && spender && ['bridge/allowance', token.chainId, tokenContract.address, owner, spender],
    () => {
      return tokenContract.allowance(owner, spender)
    },
    swrConfig,
  )
}
