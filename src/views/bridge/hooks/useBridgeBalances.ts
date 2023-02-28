import { BigNumber } from 'ethers'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import React, { useCallback, useEffect } from 'react'
import { BRIDGE_STEPS, storeBridge } from 'store/bridge/useStoreBridge'
import { fetchTokenBalance } from 'utils/bridge/token'
import { useBridgeContext } from './../../../contexts/BridgeContext'
import { useBridgeDirection } from './../../../hooks/bridge/useBridgeDirection'
import { storeNetwork } from './../../../store/network/useStoreNetwork'
import { logError } from './../../../utils/bridge/helpers'
export const useBridgeBalances = () => {
  const { account, connected, providerChainId } = useWeb3Context()
  const { getBridgeChainId, bridgeDirection } = useBridgeDirection()
  const chainId = getBridgeChainId(providerChainId)

  const {
    toToken,
    setToBalance,
    fromToken,
    setFromBalance,
    balancesLoading,
    setBalancesLoading,
    closeBalanceTask,
    setCloseBalanceTask,
  } = useBridgeContext()

  const allowFetchFrom = React.useMemo(
    () => fromToken && account && providerChainId === fromToken.chainId,
    [account, fromToken, providerChainId],
  )

  const allowFetchTo = React.useMemo(
    () => toToken && account && chainId === toToken.chainId,
    [account, chainId, toToken],
  )

  const allowFetch = React.useMemo(
    () => allowFetchFrom && allowFetchTo && bridgeDirection && !balancesLoading && connected && !closeBalanceTask,
    [allowFetchFrom, allowFetchTo, balancesLoading, bridgeDirection, connected, closeBalanceTask],
  )

  const clearBalances = useCallback(() => {
    setToBalance(BigNumber.from(0))
    setFromBalance(BigNumber.from(0))
  }, [setFromBalance, setToBalance])

  const fetchBalances = useCallback(() => {
    setBalancesLoading(true)
    clearBalances()
    Promise.all([fetchTokenBalance(toToken, account), fetchTokenBalance(fromToken, account)])
      .then(([toBalance, fromBalance]) => {
        setToBalance(toBalance)
        setFromBalance(fromBalance)
        setBalancesLoading(false)
      })
      .catch((balanceError) => {
        logError(balanceError)
        clearBalances()
        setBalancesLoading(false)
      })
      .finally(() => {
        setCloseBalanceTask(true)
      })
  }, [
    account,
    clearBalances,
    fromToken,
    setBalancesLoading,
    setCloseBalanceTask,
    setFromBalance,
    setToBalance,
    toToken,
  ])

  useEffect(() => {
    if (allowFetch) {
      fetchBalances()
    }
  }, [allowFetch, fetchBalances])

  useUpdateBalancesOnBridgeChains()
}

const useUpdateBalancesOnBridgeChains = () => {
  const refetch = useRefetchBridgeBalances()

  const refetchWithValidate = () => {
    const step = storeBridge.getState().step
    if (step === BRIDGE_STEPS.CONFIRM_TRANSFER) {
      refetch()
    }
  }

  useEffect(() => {
    const unsubscribeNetwork = storeNetwork.subscribe(
      (currentChainId: number, prevChainId: number) => {
        if (currentChainId !== prevChainId) {
          refetchWithValidate()
        }
      },
      (state) => state.currentChainId,
    )
    const unsubscribeBridge = storeBridge.subscribe(
      (toNetwork: number, prevToNetwork) => {
        if (toNetwork !== prevToNetwork) {
          refetchWithValidate()
        }
      },
      (state) => state.toNetwork,
    )
    return () => {
      unsubscribeNetwork()
      unsubscribeBridge()
    }
  }, [])
}

export const useRefetchBridgeBalances = () => {
  const { setCloseBalanceTask } = useBridgeContext()

  return () => {
    setCloseBalanceTask(false)
  }
}
