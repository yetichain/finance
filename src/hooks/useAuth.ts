/* eslint-disable react-hooks/exhaustive-deps */
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'alium-uikit/src'
import { removeConnectorId } from 'alium-uikit/src/util/connectorId/removeConnectorId'
import { NoBscProviderError } from 'connectors/bsc/bscConnector'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useToast } from 'state/hooks'
import { useStoreAccount } from 'store/account/useStoreAccount'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import GTM from 'utils/gtm'
import { getConnectorsByName } from 'utils/web3React'
import { getNetworks } from './../alium-uikit/src/widgets/WalletModal/config'
import { WEB3NetworkErrors } from './../constants/network/NetworkErrors.contanst'

const useAuth = () => {
  const { chainId, activate, deactivate, connector } = useWeb3React()
  const { account: web3Account } = useActiveWeb3React()
  const { toastError } = useToast()
  const sendDataToGTM = useGTMDispatch()
  const { setConnectionError, toggleLoadConnection, toggleConnected, loadConnection, setChainId } = useStoreNetwork()
  const account = useRef(web3Account || '')
  const clearBalance = useStoreAccount((state) => state.clearBalance)
  const networks = getNetworks()
  const supportedChains = useMemo(() => networks.map((network) => network.chainId), [])

  useEffect(() => {
    account.current = web3Account
    toggleConnected(web3Account)
    return () => {
      account.current = ''
      toggleConnected('')
    }
  }, [web3Account, loadConnection])

  // error handle
  const userWasReject = (error: Error) => {
    return error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect
  }

  // clear
  const clearConnector = () => {
    removeConnectorId()
  }

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const { connector } = getConnectorsByName(connectorID)
      try {
        if (!connector) {
          return
        }
        toggleLoadConnection(true)
        await activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            await unsupportedError(error, connector)
          } else {
            clearConnector()
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              toastError(WEB3NetworkErrors.NOPROVIDER)
            } else if (userWasReject(error)) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              toastError(WEB3NetworkErrors.NOAUTH)
            } else {
              toastError(error.name, error.message)
            }
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        toggleLoadConnection(false)
        setConnectionError(null)
        account.current && GTM.connectWallet(sendDataToGTM, chainId)
      }
    },
    [chainId],
  )

  const unsupportedError = async (error: Error, connector: any) => {
    if (connector instanceof WalletConnectConnector) {
      await logout(connector)
    }
    if (supportedChains.includes(chainId)) {
      toastError(WEB3NetworkErrors.CANTSETUP)
    } else {
      toastError(WEB3NetworkErrors.UNSUPPORTED_CHAIN, error.message)
    }
    setConnectionError(WEB3NetworkErrors.UNSUPPORTED_CHAIN)
    if (chainId) {
      // Set previous chainId
      setChainId(chainId)
    }
  }

  const logout = useCallback(
    (_connector?: any) => {
      const currentConnector = _connector || connector
      deactivate()
      clearBalance()
      // This localStorage key is set by @web3-react/walletconnect-connector

      if (window.localStorage.getItem('walletconnect') && currentConnector instanceof WalletConnectConnector) {
        currentConnector.walletConnectProvider?.qrcodeModal?.close()
        currentConnector.close()
        currentConnector.walletConnectProvider = null
      }
      clearConnector()
    },
    [deactivate, chainId],
  )

  return { login, logout }
}

export default useAuth
