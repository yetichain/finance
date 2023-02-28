import React, { FC } from 'react'
import { useStoreAccount } from 'store/account/useStoreAccount'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import LanguageSwitch from '../LanguageSwitch'
import { useWalletModal } from '../WalletModal'
import { Login } from '../WalletModal/types'
import { ConnectButton } from './ConnectButton'
import NetworkSwitch from './NetworkSwitch'

interface Props {
  loginBlockVisible?: boolean
  account?: string
  login: Login
  logout: () => void
  buttonTitle?: string
  balance?: string
  explorerName?: string
  explorerLink?: string
  onTransactionHistoryHandler?: any
  balanceHook?: any
}

const UserBlock: FC<Props> = (props) => {
  const modalConnect = useStoreAccount((state) => state.modalConnect)
  const { account, login, logout, explorerName, explorerLink, onTransactionHistoryHandler, loginBlockVisible } = props

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    login,
    logout,
    account,
    explorerName,
    explorerLink,
    onTransactionHistoryHandler,
  )
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  React.useEffect(() => {
    if (modalConnect) {
      onPresentConnectModal()
    }
  }, [modalConnect])

  if (!loginBlockVisible) {
    return null
  }

  return (
    <>
      <StyledLanguageSwitch />
      <NetworkSwitch />
      <ConnectButton
        isAccount={!!account}
        accountEllipsis={accountEllipsis}
        onClick={() => (account ? onPresentAccountModal() : onPresentConnectModal())}
      />
    </>
  )
}

const StyledLanguageSwitch = styled(LanguageSwitch)`
  margin-right: 16px;

  @media ${mq.down(breakpoints.md)} {
    display: none;
  }
`

export default UserBlock
