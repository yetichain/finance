import { getConnectorId } from 'alium-uikit/src/util/connectorId/getConnectorId'
import { WEB3NetworkErrors } from 'constants/network/NetworkErrors.contanst'
import useAuth from 'hooks/useAuth'
import { useCallback, useEffect } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { ConnectorNames } from './../alium-uikit/src/util/connectorId/setConnectorId'
import { useReloadSwap } from './network/useReloadSwap'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) => {
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    })
  })

const useEagerConnect = () => {
  const { connectIsFailed } = useStoreNetwork()
  const { login, logout } = useAuth()
  useReloadSwap(logout)

  const currentChainId = useStoreNetwork((state) => state.currentChainId)

  const connect = useCallback(async () => {
    const connectorId = getConnectorId()
    if (connectorId) {
      if (connectorId && connectorId === ConnectorNames.BSC && (currentChainId === 56 || currentChainId === 97)) {
        // Currently BSC extension doesn't always inject in time.
        // We must check to see if it exists, and if not, wait for it before proceeding.
        const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')
        if (!isBinanceChainDefined) {
          _binanceChainListener().then(() => login(connectorId))
          return
        }
      }
      await login(connectorId)
    }
  }, [currentChainId, login])

  useEffect(() => {
    if (currentChainId) {
      connect()
    }
  }, [connect, currentChainId])

  useEffect(() => {
    if (connectIsFailed === WEB3NetworkErrors.UNSUPPORTED_CHAIN && window.ethereum?.on) {
      window.ethereum.on('chainChanged', connect)
      return () => {
        window.ethereum.removeListener('chainChanged', connect)
      }
    }
  }, [connect, connectIsFailed])
}

export default useEagerConnect
