import { Button, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import { ReactComponent as PlusIcon } from './plus.svg'
import { ReactComponent as WalletIcon } from './wallet.svg'

export default function ConnectWallet() {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  return (
    <ConnectWallet.Root>
      <WalletIcon />
      <ConnectWallet.Text>{t('Please connect to your wallet first')}</ConnectWallet.Text>
      <ConnectWallet.Button onClick={onPresentConnectModal}>
        <PlusIcon />
        {t('Connect Wallet')}
      </ConnectWallet.Button>
    </ConnectWallet.Root>
  )
}

ConnectWallet.Button = styled(Button)`
  letter-spacing: 1px;
  & > svg {
    margin-right: 16px;
  }
`

ConnectWallet.Text = styled.div`
  ${typography.h6}
  text-align: center;
  color: #0b1359;
  margin: 16px 0 24px;
`

ConnectWallet.Root = styled(Card)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 438px;

  @media ${mq.down(breakpoints.sm)} {
    min-height: 320px;

    ${ConnectWallet.Text} {
      ${typography.regular.medium}
    }
  }
`
