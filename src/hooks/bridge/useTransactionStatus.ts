import { Web3Provider } from '@ethersproject/providers'
import { POLLING_INTERVAL } from 'constants/bridge/bridge.env'
import { useBridgeContext } from 'contexts/BridgeContext'
import { i18n } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { logError } from 'utils/bridge/helpers'
import { getMessage, getMessageData, messageCallStatus, NOT_ENOUGH_COLLECTED_SIGNATURES } from 'utils/bridge/message'
import { getEthersProvider } from 'utils/bridge/providers'
import { useStoreBridge } from './../../store/bridge/useStoreBridge'
import { useBridgeDirection } from './useBridgeDirection'
import { useWeb3Context } from './useWeb3Context'

export const useTransactionStatus = () => {
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [confirmations, setConfirmations] = useState(0)

  const { homeChainId, getBridgeChainId, getAMBAddress } = useBridgeDirection()
  const { ethersProvider, providerChainId: chainId } = useWeb3Context()
  const setMessage = useStoreBridge((state) => state.setTransactionMessage)
  const loadingText = useStoreBridge((state) => state.transactionText)
  const setLoadingText = useStoreBridge((state) => state.setTransactionText)

  const { loading, setLoading, txHash, totalConfirms, setTransactionFailed, transactionFailed } = useBridgeContext()

  const isHome = chainId === homeChainId
  const bridgeChainId = getBridgeChainId(chainId)

  const completeReceipt = useCallback(() => {
    setLoading(false)
  }, [])

  const incompleteReceipt = useCallback(() => {
    setLoading(false)
  }, [])

  const clear = useCallback(() => {
    setLoadingText('')
    setConfirmations(0)
  }, [])

  const statusOnError = useCallback(() => {
    setTransactionFailed(true)
    setLoadingText('')
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      clear()
    }
  }, [loading])

  const getStatus = useCallback(async () => {
    try {
      if (transactionFailed) {
        return
      }
      const txReceipt = await ethersProvider.getTransactionReceipt(txHash)
      const numConfirmations = txReceipt ? txReceipt.confirmations : 0
      const enoughConfirmations = numConfirmations >= totalConfirms

      if (txReceipt) {
        setConfirmations(numConfirmations)

        if (enoughConfirmations) {
          if (isHome) {
            setLoadingText(i18n.t('Collecting Signatures'))
            const message = await getMessage(isHome, ethersProvider, getAMBAddress(chainId), txHash)
            if (message?.signatures) {
              setNeedsConfirmation(true)
              incompleteReceipt()
              setMessage(message)
              return true
            }
          } else {
            setLoadingText('Waiting for Execution')

            const bridgeProvider = await getEthersProvider(bridgeChainId)
            const bridgeAmbAddress = getAMBAddress(bridgeChainId)
            console.log('----------------------------------------')
            console.log('bridge :: getStatus - getMessageData :: start')
            console.log(`txHash - ${txHash}, txReceipt -`, txReceipt)

            const { messageId } = await getMessageData(isHome, ethersProvider, txHash, txReceipt)
            console.log('bridge :: getStatus - getMessageData :: end')
            console.log(`messageId - ${messageId}`)

            console.log('bridge :: getStatus - messageCallStatus :: start')
            console.log(`bridgeAmbAddress - ${bridgeAmbAddress}`)
            const status = await messageCallStatus(bridgeAmbAddress, bridgeProvider, messageId)
            console.log('bridge :: getStatus - messageCallStatus :: end')
            console.log(`status - ${status}`)
            console.log('----------------------------------------')
            if (status) {
              completeReceipt()
              return true
            }
          }
        }
      }
    } catch (txError) {
      console.error(txError)
      if (isHome && txError && txError.message === NOT_ENOUGH_COLLECTED_SIGNATURES) {
        return false
      }
      statusOnError()
      // completeReceipt()
      logError({ txError })
      return true
    }
    return false
  }, [
    transactionFailed,
    ethersProvider,
    txHash,
    totalConfirms,
    isHome,
    setLoadingText,
    getAMBAddress,
    chainId,
    incompleteReceipt,
    setMessage,
    bridgeChainId,
    completeReceipt,
    statusOnError,
  ])

  usePollingTs({ getStatus, loading, txHash, ethersProvider, setLoadingText })

  useEffect(() => {
    setNeedsConfirmation((needs) => chainId === homeChainId && needs)
  }, [chainId, homeChainId])

  return {
    loadingText,
    needsConfirmation,
    setNeedsConfirmation,
    confirmations,
  }
}

interface Params {
  getStatus: () => Promise<boolean>
  loading: boolean
  txHash: string
  ethersProvider: Web3Provider
  setLoadingText: (transactionText: string) => void
}

const usePollingTs = ({ getStatus, loading, txHash, ethersProvider, setLoadingText }: Params) => {
  // Conditions
  const notAllowPingTx = useMemo(() => !loading || !txHash || !ethersProvider, [loading, txHash, ethersProvider])

  useEffect(() => {
    if (notAllowPingTx) {
      return
    }

    const subscriptions = []
    const unsubscribe = () => {
      subscriptions.forEach((s) => {
        clearTimeout(s)
      })
    }

    setLoadingText(i18n.t('Waiting for Block Confirmations'))
    let isSubscribed = true

    const updateStatus = async () => {
      unsubscribe()
      const status = !isSubscribed || (await getStatus())
      if (!status && loading && txHash && ethersProvider) {
        unsubscribe()
        const timeoutId = setTimeout(() => updateStatus(), Number(POLLING_INTERVAL) || 5000)
        subscriptions.push(timeoutId)
      }
    }

    updateStatus()

    // unsubscribe when unmount component
    return () => {
      isSubscribed = false
      unsubscribe()
    }
  }, [notAllowPingTx])
}
