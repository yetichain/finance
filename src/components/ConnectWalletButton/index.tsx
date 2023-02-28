import { Button, useWalletModal } from 'alium-uikit/src'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { ReactComponent as AddIcon } from 'public/icons/ConnectAdd.svg'
import styled from 'styled-components'

interface IUnlockButtonProps {
  alt?: boolean
  fullwidth?: boolean
  title?: string
}

const UnlockButton = ({ title, ...props }: IUnlockButtonProps) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <StyledButtonUnlockWallet>
      <Button onClick={onPresentConnectModal} {...props}>
        {props.alt ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='icon'>
              <AddIcon />
            </div>
            {t('Connect')}
          </div>
        ) : (
          <div>{title ? title : t('Unlock Wallet')}</div>
        )}
      </Button>
    </StyledButtonUnlockWallet>
  )
}

export default UnlockButton

// styles

const StyledButtonUnlockWallet = styled.div`
  button {
    width: 100%;
    margin-top: 10px;
  }

  .icon {
    margin-right: 18px;
  }
`
