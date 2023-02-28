import { ADDRESS_ZERO } from 'constants/bridge/bridge.constants'
import { BigNumber } from 'ethers'
import { useApproval } from 'hooks/bridge/useApprovalBridge'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useFeeManager } from 'hooks/bridge/useFeeManager'
import { useMediatorInfo } from 'hooks/bridge/useMediatorInfo'
import { useTotalConfirms } from 'hooks/bridge/useTotalConfirms'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useToast } from 'state/hooks'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { fetchToAmount, fetchTokenLimits, fetchToToken } from 'utils/bridge/bridge'
import { BridgeToken } from 'utils/bridge/entities/BridgeToken'
import {
  getDefaultToken,
  getHelperContract,
  getMediatorAddress,
  getNativeCurrency,
  logError,
  parseValue,
} from 'utils/bridge/helpers'
import { fetchTokenDetails } from 'utils/bridge/token'

export const BridgeContext = React.createContext({
  fromAmount: BigNumber.from(0),
  toAmount: BigNumber.from(0),
  toAmountLoading: false,
  setAmount: async (inputAmount: any) => {},
  fromToken: null as BridgeToken | null,
  toToken: null as BridgeToken | null,
  tokensDetailLoader: false,
  setToToken: (newToToken: BridgeToken) => {},
  setToken: async (tokenWithoutMode: BridgeToken, isQueryToken?: any) => true,
  setDefaultToken: async (chainId: number) => {},
  allowed: false,
  approve: async () => {},
  mutateAllowance: () => {},
  transactionFailed: false,
  setTransactionFailed: (hasError: boolean) => {},
  loading: false,
  setLoading: (toggle: boolean) => {},
  txHash: '',
  setTxHash: (hash: string) => {},
  totalConfirms: 0,
  amountInput: '',
  setAmountInput: (amount: string) => {},
  fromBalance: BigNumber.from(0),
  setFromBalance: (balance: BigNumber) => {},
  toBalance: BigNumber.from(0),
  setToBalance: (balance: BigNumber) => {},
  balancesLoading: true,
  closeBalanceTask: true,
  setCloseBalanceTask: (toggle: boolean) => {},
  setBalancesLoading: (toggle: boolean) => {},
  tokenLimits: null as { minPerTx: BigNumber; maxPerTx: BigNumber; dailyLimit: BigNumber },
  updateTokenLimits: null as () => {},
  receiver: '',
  setReceiver: (receiver: string) => {},
  shouldReceiveNativeCur: false,
  setShouldReceiveNativeCur: (should: boolean) => {},
  unlockLoading: false,
  approvalTxHash: '',
  feeManagerAddress: '',
  clearTransaction: null as () => void,
})

export const useBridgeContext = () => useContext(BridgeContext)

export const BridgeProvider = ({ children }) => {
  const [queryToken, setQueryToken] = useState('')

  const { ethersProvider, providerChainId, connected } = useWeb3Context()
  const { bridgeDirection, getBridgeChainId, foreignChainId, reverted } = useBridgeDirection()

  const isHome = !reverted

  const [receiver, setReceiver] = useState('')
  const [amountInput, setAmountInput] = useState('')
  const { fromToken, toToken } = useStoreBridge((state) => state.tokens)
  const setTokens = useStoreBridge((state) => state.setTokens)
  const [tokensDetailLoader, setTokensDetailLoader] = useState(false)

  const { fromAmount, toAmount } = useStoreBridge((state) => state.amounts)
  const setAmounts = useStoreBridge((state) => state.setAmounts)

  const [toAmountLoading, setToAmountLoading] = useState(false)
  // Transaction
  const [loading, setLoading] = useState(false)
  const [shouldReceiveNativeCur, setShouldReceiveNativeCur] = useState(false)
  const [transactionFailed, setTransactionFailed] = useState(false)
  const txHash = useStoreBridge((state) => state.txHash)
  const setTxHash = useStoreBridge((state) => state.setTxHash)
  const setLoadingText = useStoreBridge((state) => state.setTransactionText)
  // Transaction End
  // Balance
  const [balancesLoading, setBalancesLoading] = useState(false)
  const [fromBalance, setFromBalance] = useState(BigNumber.from(0))
  const [toBalance, setToBalance] = useState(BigNumber.from(0))
  const [closeBalanceTask, setCloseBalanceTask] = useState(false)
  // Balance end

  const [tokenLimits, setTokenLimits] = useState(null)

  const { toastError: toast } = useToast()
  const totalConfirms = useTotalConfirms()
  const { currentDay, feeManagerAddress } = useMediatorInfo()
  const { isRewardAddress, homeToForeignFeeType, foreignToHomeFeeType } = useFeeManager()
  const { allowed, unlockLoading, approvalTxHash, approve, mutateAllowance } = useApproval(
    fromToken,
    fromAmount,
    txHash,
  )

  const feeType = isHome ? homeToForeignFeeType : foreignToHomeFeeType

  const getToAmount = useCallback(
    async (amount) =>
      isRewardAddress ? amount : fetchToAmount(bridgeDirection, feeType, fromToken, toToken, amount, feeManagerAddress),
    [bridgeDirection, feeManagerAddress, fromToken, isRewardAddress, toToken, feeType],
  )

  const setAmount = useCallback(
    async (inputAmount) => {
      if (!fromToken || !toToken) return
      setToAmountLoading(true)
      const amount = parseValue(inputAmount, fromToken.decimals)
      const gotToAmount = await getToAmount(amount)

      setAmounts({ fromAmount: amount, toAmount: gotToAmount })
      setToAmountLoading(false)
    },
    [fromToken, getToAmount, setAmounts, toToken],
  )

  const setToToken = useCallback(
    (newToToken: BridgeToken) => {
      const tokens = {
        fromToken,
        toToken: newToToken,
      }
      setTokens(tokens)
    },
    [fromToken, setTokens],
  )

  const setToken = useCallback(
    async (tokenWithoutMode: BridgeToken, isQueryToken = false) => {
      setTokensDetailLoader(true)
      if (tokensDetailLoader) {
        return
      }
      if (!tokenWithoutMode) {
        toast('Token not found.')
        setTokensDetailLoader(false)
        return
      }
      try {
        const [token, gotToToken] = await Promise.all([
          tokenWithoutMode?.address === ADDRESS_ZERO
            ? new BridgeToken({
                ...getNativeCurrency(tokenWithoutMode.chainId),
                mediator: getMediatorAddress(bridgeDirection, tokenWithoutMode),
                helperContractAddress: getHelperContract(tokenWithoutMode.chainId),
              })
            : fetchTokenDetails(bridgeDirection, tokenWithoutMode),
          fetchToToken(bridgeDirection, tokenWithoutMode, getBridgeChainId(tokenWithoutMode.chainId)),
        ])

        setTokens({ fromToken: token, toToken: new BridgeToken({ ...token?.raw, ...gotToToken?.raw }) })
        return true
      } catch (tokenDetailsError) {
        setTokensDetailLoader(false)
        toast(
          !isQueryToken
            ? 'Cannot fetch token details. Wait for a few minutes and reload the application'
            : 'Token not found.',
        )
        logError({ tokenDetailsError })
        return false
      } finally {
        setTokensDetailLoader(false)
      }
    },
    [bridgeDirection, getBridgeChainId, setTokens, toast],
  )

  const clearTransaction = useCallback(() => {
    setTxHash('')
    setLoading(false)
    setLoadingText('')
    setTransactionFailed(false)
  }, [])

  const setDefaultToken = useCallback(
    async (chainId: number) => {
      if (
        fromToken &&
        toToken &&
        toToken.chainId === chainId &&
        (toToken.address !== ADDRESS_ZERO || toToken.mode === 'NATIVE')
      ) {
        setTokens({ fromToken: toToken, toToken: fromToken })
      } else if (
        !(fromToken && toToken && fromToken.chainId === chainId && toToken.chainId === getBridgeChainId(chainId))
      ) {
        console.log('getDefaultToken', getDefaultToken(bridgeDirection, chainId))
        await setToken(getDefaultToken(bridgeDirection, chainId))
      }
    },
    [bridgeDirection, fromToken, getBridgeChainId, setToken, setTokens, toToken],
  )

  const updateToken = useCallback(async () => {
    setLoading(true)

    if (!queryToken) {
      await setDefaultToken(providerChainId)
    } else if (
      !(
        fromToken &&
        toToken &&
        fromToken.chainId === providerChainId &&
        toToken.chainId === getBridgeChainId(providerChainId)
      )
    ) {
      // const isQueryTokenSet = await setToken(queryToken, true)
      const isQueryTokenSet = false
      if (!isQueryTokenSet) {
        await setDefaultToken(providerChainId)
      }
      setQueryToken(null)
    }
    setLoading(false)
  }, [fromToken, getBridgeChainId, providerChainId, queryToken, setDefaultToken, toToken])

  const [limitsLoading, setLimitsLoading] = useState(false)
  const updateTokenLimits = useCallback(async () => {
    if (
      providerChainId &&
      ethersProvider &&
      fromToken &&
      toToken &&
      fromToken.chainId === providerChainId &&
      toToken.chainId === getBridgeChainId(providerChainId) &&
      fromToken.symbol === toToken.symbol &&
      currentDay &&
      bridgeDirection &&
      !limitsLoading &&
      !tokenLimits
    ) {
      setLimitsLoading(true)
      const limits = await fetchTokenLimits(bridgeDirection, ethersProvider, fromToken, toToken, currentDay)
      console.log('bridge :: daily limits')
      console.log(limits)
      setTokenLimits(limits)
      setLimitsLoading(false)
    }
  }, [
    providerChainId,
    ethersProvider,
    fromToken,
    toToken,
    getBridgeChainId,
    currentDay,
    bridgeDirection,
    limitsLoading,
    tokenLimits,
  ])

  useEffect(() => {
    if (!connected) return
    updateTokenLimits()
  }, [providerChainId, bridgeDirection, connected, fromToken, toToken])

  useEffect(() => {
    if (!connected) return
    if (toToken?.chainId === foreignChainId && toToken?.address === ADDRESS_ZERO && toToken?.mode === 'NATIVE') {
      setShouldReceiveNativeCur(true)
    } else {
      setShouldReceiveNativeCur(false)
    }
  }, [providerChainId, bridgeDirection, connected, toToken?.chainId, toToken?.address, toToken?.mode, foreignChainId])

  useEffect(() => {
    if (!connected) return
    updateToken()
  }, [providerChainId, bridgeDirection, connected])
  const value = useMemo(
    () => ({
      fromAmount,
      toAmount,
      toAmountLoading,
      setAmount,
      fromToken,
      toToken,
      setToToken,
      setToken,
      setDefaultToken,
      allowed,
      approve,
      loading,
      setLoading,
      transactionFailed,
      setTransactionFailed,
      txHash,
      setTxHash,
      totalConfirms,
      closeBalanceTask,
      setCloseBalanceTask,
      amountInput,
      setAmountInput,
      fromBalance,
      setFromBalance,
      toBalance,
      setToBalance,
      balancesLoading,
      setBalancesLoading,
      tokenLimits,
      updateTokenLimits,
      receiver,
      setReceiver,
      shouldReceiveNativeCur,
      setShouldReceiveNativeCur,
      unlockLoading,
      approvalTxHash,
      feeManagerAddress,
      tokensDetailLoader,
      clearTransaction,
      mutateAllowance,
    }),
    [
      fromAmount,
      toAmount,
      toAmountLoading,
      setAmount,
      fromToken,
      toToken,
      setToToken,
      setToken,
      setDefaultToken,
      allowed,
      approve,
      loading,
      transactionFailed,
      txHash,
      setTxHash,
      totalConfirms,
      closeBalanceTask,
      amountInput,
      fromBalance,
      toBalance,
      balancesLoading,
      tokenLimits,
      updateTokenLimits,
      receiver,
      shouldReceiveNativeCur,
      unlockLoading,
      approvalTxHash,
      feeManagerAddress,
      tokensDetailLoader,
      clearTransaction,
      mutateAllowance,
    ],
  )

  return <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
}
