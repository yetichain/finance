import { removeConnectorId } from 'alium-uikit/src/util/connectorId/removeConnectorId'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useStoreAccount } from 'store/account/useStoreAccount'
import styled from 'styled-components'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import Button from '../../components/Button/Button'
import Flex from '../../components/Flex/Flex'
import { BSCScanIcon, ExitIcon, ModalBackgroundIcon, TransactionHistoryIcon } from '../../components/Svg'
import DefaultAvatar from '../../components/Svg/Icons/DefaultAvatar'
import InputCopy from '../../components/Svg/Icons/InputCopy'
import MetaMask from '../../components/Svg/Icons/MetaMask'
import Text from '../../components/Text/Text'
import { Modal } from '../Modal'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  title?: string
  logoutTitle?: string
  explorerName?: string
  explorerLink?: string
  tokenAmount?: string
  tokenSymbol?: string
  networkName?: string
  balance?: string
  onTransactionHistoryHandler?: any
  balanceHook?: any
}

const svgString = encodeURIComponent(renderToStaticMarkup(<ModalBackgroundIcon />))

const AccountModal: FC<Props> = ({
  account,
  logout,
  onDismiss = () => null,
  explorerName,
  explorerLink,
  tokenSymbol,
  networkName,
  onTransactionHistoryHandler,
}) => {
  const { t } = useTranslation()
  const balance = useStoreAccount((state) => state.balance)
  const [etherBalance] = useStoreAccount((state) => [state.etherBalance])
  const currentBalance = toSignificantCurrency(balance?.currencyBalance)

  React.useEffect(() => {
    ;(async () => {
      await etherBalance(account)
    })()
  }, [])

  return (
    <Modal title={t('Account')} onDismiss={onDismiss} styledModalContent={{ padding: '0 24px 32px 24px' }}>
      <StyledBackGround style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}>
        <StyledInfo>
          <DefaultAvatar width='80px' height='80px' />
          <StyledFlex>
            <Flex flexDirection='column' marginLeft={40}>
              <Text color='#CBC8EE'>{t('Balance')}</Text>
              <Text color='white'>
                {!currentBalance || currentBalance === '-' ? (
                  <p>{t('Loading balance...')}</p>
                ) : (
                  `${currentBalance} ${tokenSymbol}`
                )}
              </Text>
            </Flex>
            <Flex flexDirection='column' marginLeft={40}>
              <Text color='#CBC8EE'>{t('Network')}</Text>
              <Text color='white'>{networkName}</Text>
            </Flex>
          </StyledFlex>
        </StyledInfo>
      </StyledBackGround>
      <StyledInputContainer>
        <MetaMask width='32' height='32' />
        <StyledInput value={account} />
        <InputCopy
          height='24px'
          width='24px'
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(account)
            }
          }}
        />
      </StyledInputContainer>
      <StyledFlex mt='16px' justifyContent='space-between'>
        <StyledButton size='md' variant='secondary' onClick={() => window.open(explorerLink)}>
          <BSCScanIcon mr={16} />
          {t('View on {{explorerName}}', { explorerName })}
        </StyledButton>
        <StyledButton size='md' variant='secondary' onClick={onTransactionHistoryHandler}>
          <TransactionHistoryIcon mr={16} />
          {t('Transaction History')}
        </StyledButton>
        <StyledButton
          size='md'
          variant='secondary'
          onClick={() => {
            logout()
            removeConnectorId()
            onDismiss()
          }}
        >
          <ExitIcon mr={16} />
          {t('Logout')}
        </StyledButton>
      </StyledFlex>
    </Modal>
  )
}

export default AccountModal

// styles

const StyledBackGround = styled.div`
  background-position: center;
  height: 128px;
  width: auto;
  margin: 0 -25px;
  display: flex;
  align-items: center;
  padding: 24px;
  background-clip: padding-box;
`

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 16px 50px 16px 46px;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  color: #8990a5;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-align: left;

  &:focus {
    border: 1px solid #d2d6e5;
    outline: none;
  }
`

const StyledInputContainer = styled.div`
  margin-top: 24px;
  position: relative;

  & > svg {
    &:first-child {
      cursor: pointer;
      position: absolute;
      left: 8px;
      top: 10px;
    }

    &:last-child {
      cursor: pointer;
      position: absolute;
      right: 16px;
      top: 12px;
    }
  }
`

const StyledButton = styled(Button)`
  svg * {
    transition: stroke 200ms ease-in-out;
  }

  &:hover {
    svg * {
      stroke: white;
    }
  }

  @media screen and (max-width: 800px) {
    max-width: none;
    width: 100%;
  }
`

const StyledFlex = styled(Flex)`
  @media screen and (max-width: 800px) {
    flex-direction: column;

    & > * {
      width: 100%;
    }

    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  ${StyledButton} {
    margin-right: 8px;

    &:last-child {
      margin: 0;
    }
  }
`
