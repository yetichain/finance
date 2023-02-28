import { useTranslation } from 'next-i18next'
import React from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { ConnectorNames } from '../../util/connectorId/setConnectorId'
import { useModal } from '../Modal'
import AccountModal from './AccountModal'
import ConnectModal from './ConnectModal'
import { Login } from './types'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
  chainId?: number | null
}

const useWalletModal = (
  login: Login,
  logout: () => void,
  account?: string,
  explorerName?: string,
  explorerLink?: string,
  onTransactionHistoryHandler?: () => void,
): ReturnType => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const { t } = useTranslation()
  const loginWithUpdateNetwork = async (connectorId: ConnectorNames): Promise<void> => {
    try {
      await login(connectorId)
    } catch (e) {
      console.error(e)
    }
  }

  const chainIdData: { [i: number]: { tokenSymbol: string; networkName: string } } = {
    1: {
      tokenSymbol: t('ETH'),
      networkName: t('Ethereum Chain'),
    },
    4: {
      tokenSymbol: t('ETH'),
      networkName: t('Ethereum Chain Testnet Ropsten'),
    },
    56: {
      tokenSymbol: t('BNB'),
      networkName: t('Binance Smart Chain'),
    },
    97: {
      tokenSymbol: t('BNB'),
      networkName: t('Binance Smart Chain Testnet'),
    },
    128: {
      tokenSymbol: t('HT'),
      networkName: t('Huobi ECO Chain'),
    },
    137: {
      tokenSymbol: t('MATIC'),
      networkName: t('Polygon Matic Chain'),
    },
    256: {
      tokenSymbol: t('HT'),
      networkName: t('Huobi ECO Chain Testnet'),
    },
    80001: {
      tokenSymbol: t('MATIC'),
      networkName: t('Polygon Matic Chain Testnet'),
    },
  }

  const [onPresentConnectModal] = useModal(<ConnectModal login={loginWithUpdateNetwork} />)
  const [onPresentAccountModal] = useModal(
    <AccountModal
      account={account || ''}
      logout={logout}
      explorerName={explorerName}
      explorerLink={explorerLink}
      tokenSymbol={chainIdData[currentChainId]?.tokenSymbol ?? t('Undefined Token')}
      networkName={
        chainIdData[currentChainId]?.networkName ?? t('Undefined Chain (ID: {{currentChainId}})', { currentChainId })
      }
      onTransactionHistoryHandler={onTransactionHistoryHandler}
    />,
  )

  return { onPresentConnectModal, onPresentAccountModal, chainId: currentChainId }
}

export default useWalletModal
