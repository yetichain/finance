import { CurrencyAmount, TokenAmount, Trade } from '@alium-official/sdk'
import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { useTokenAllowance } from 'data/Allowances'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Field } from 'state/swap/actions'
import { useHasPendingApproval, useTransactionAdder } from 'state/transactions/hooks'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { calculateGasMargin, calculateGasPrice } from 'utils'
import { computeSlippageAdjustedAmounts } from 'utils/prices'
import { useActiveWeb3React } from './index'
import { useTokenContract } from './useContract'

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns

type useApproveCallback = (amountToApprove?: CurrencyAmount, spender?: string) => [ApprovalState, () => Promise<void>]

export const useApproveCallback: useApproveCallback = (amountToApprove, spender) => {
  const { t } = useTranslation()
  const { currentNetwork } = storeNetwork.getState()
  const { nativeCurrency } = currentNetwork.providerParams
  const { account } = useActiveWeb3React()

  const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)
  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove?.currency?.symbol === nativeCurrency?.symbol) return ApprovalState.APPROVED

    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, nativeCurrency?.symbol, pendingApproval, spender])

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!amountToApprove) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return tokenContract.estimateGas.approve(spender, amountToApprove.raw.toString())
    })

    const gasPrice = await calculateGasPrice(tokenContract.provider)

    return tokenContract
      .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
        gasPrice,
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: t('Approve {{currencySymbol}}', { currencySymbol: amountToApprove.currency.symbol }),
          approval: { tokenAddress: token.address, spender },
        })
      })
      .catch((error: Error) => {
        console.error('Failed to approve token', error)
        throw error
      })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction])

  return [approvalState, approve]
}

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromTrade(trade?: Trade, allowedSlippage = 0) {
  const { currentNetwork } = storeNetwork.getState()
  const amountToApprove = useMemo(
    () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined),
    [trade, allowedSlippage],
  )
  return useApproveCallback(amountToApprove, currentNetwork.address.router)
}
