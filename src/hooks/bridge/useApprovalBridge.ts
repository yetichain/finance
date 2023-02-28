import { LARGEST_UINT256, LOCAL_STORAGE_KEYS } from 'constants/bridge/bridge.constants'
import { BigNumber } from 'ethers'
import { useCallback, useMemo, useState } from 'react'
import { BridgeToken } from 'utils/bridge/entities/BridgeToken'
import { logError } from 'utils/bridge/helpers'
import { approveToken } from 'utils/bridge/token'
import useAllowance from './useAllowance'
import { useWeb3Context } from './useWeb3Context'

const { INFINITE_UNLOCK } = LOCAL_STORAGE_KEYS

export const useApproval = (fromToken: BridgeToken, fromAmount: BigNumber, txHash: string) => {
  const { account, ethersProvider } = useWeb3Context()
  const { data: allowance, mutate: mutateAllowance } = useAllowance(fromToken, account, fromToken?.mediator)
  const allowed = useMemo(
    () => (fromToken && ['NATIVE', 'erc677'].includes(fromToken.mode)) || allowance?.gte(fromAmount),
    [allowance, fromAmount, fromToken],
  )

  const [unlockLoading, setUnlockLoading] = useState(false)
  const [approvalTxHash, setApprovalTxHash] = useState('')

  const approve = useCallback(async () => {
    setUnlockLoading(true)
    const approvalAmount = window.localStorage.getItem(INFINITE_UNLOCK) === 'true' ? LARGEST_UINT256 : fromAmount
    try {
      const tx = await approveToken(ethersProvider, fromToken, approvalAmount)
      console.log(`approveToken :: tx/result ::`)
      console.log(tx)

      setApprovalTxHash(tx.hash)
      console.log('approveToken :: tx.wait() :: start')
      await tx.wait()
      await mutateAllowance()
      console.log('approveToken :: tx.wait() :: end')
    } catch (approveError) {
      logError({
        approveError,
        fromToken,
        approvalAmount: approvalAmount.toString(),
        account,
      })
      throw approveError
    } finally {
      setApprovalTxHash('')
      setUnlockLoading(false)
    }
  }, [fromAmount, ethersProvider, fromToken, mutateAllowance, account])

  return { allowed, unlockLoading, approvalTxHash, approve, mutateAllowance }
}
