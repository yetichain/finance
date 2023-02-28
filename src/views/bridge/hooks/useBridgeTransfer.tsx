import { ADDRESS_ZERO } from 'constants/bridge/bridge.constants'
import { useBridgeContext } from 'contexts/BridgeContext'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useTransactionStatus } from 'hooks/bridge/useTransactionStatus'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import { useCallback } from 'react'
import { relayTokens } from 'utils/bridge/bridge'
import { logError } from 'utils/bridge/helpers'

export const useBridgeTransfer = () => {
  const {
    setLoading,
    shouldReceiveNativeCur,
    toToken,
    fromToken,
    receiver,
    fromAmount,
    setTransactionFailed,
    setTxHash,
  } = useBridgeContext()

  // Delegate process transfer to useTransactionStatus
  useTransactionStatus()

  const { ethersProvider, account, isGnosisSafe } = useWeb3Context()
  const { foreignChainId } = useBridgeDirection()

  const transfer = useCallback(
    (): Promise<string> =>
      new Promise((resolve, reject) => {
        if (!fromToken || !toToken) {
          return
        }
        setLoading(true)
        if (isGnosisSafe && !receiver) {
          throw new Error('Must set receiver for Gnosis Safe')
        }

        relayTokens(ethersProvider, fromToken, receiver || account, fromAmount, {
          shouldReceiveNativeCur:
            (shouldReceiveNativeCur && toToken?.address === ADDRESS_ZERO && toToken?.mode === 'NATIVE') ||
            !toToken?.address,
          foreignChainId,
        })
          .then((tx) => {
            setTxHash(tx.hash)
            resolve(tx.hash)
          })
          .catch((transferError) => {
            logError({
              transferError,
              fromToken,
              receiver: receiver || account,
              fromAmount: fromAmount.toString(),
              account,
            })
            reject(transferError)
            setTransactionFailed(true)
            setLoading(false)
          })
      }),
    [
      account,
      ethersProvider,
      foreignChainId,
      fromAmount,
      fromToken,
      isGnosisSafe,
      receiver,
      setTxHash,
      shouldReceiveNativeCur,
      toToken?.address,
      toToken?.mode,
    ],
  )
  return transfer
}
