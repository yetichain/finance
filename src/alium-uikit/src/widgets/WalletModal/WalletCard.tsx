import { setConnectorId } from 'alium-uikit/src/util/connectorId/setConnectorId'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Flex from '../../components/Flex/Flex'
import { CheckmarkCircleIcon } from '../../components/Svg'
import Text from '../../components/Text/Text'
import { ConnectorNames, Login, WalletsConfig } from './types'

interface Props {
  walletConfig: WalletsConfig
  login: Login
  onDismiss: () => void
  selected?: boolean
  setSelectedWallet: (arg0: string) => void
  availableConnectors: ConnectorNames[]
  chainId: number
}

const WalletCard: FC<Props> = ({
  login,
  walletConfig,
  onDismiss,
  selected,
  setSelectedWallet,
  availableConnectors,
  chainId,
}) => {
  const { t } = useTranslation()
  const { title, icon: Icon } = walletConfig
  const onClickHandler = async () => {
    try {
      setConnectorId(walletConfig.connectorId)
      await login(walletConfig.connectorId)
      setSelectedWallet(title)
      onDismiss()
    } catch (error) {
      console.error(error)
    }
  }

  const isBlurred =
    availableConnectors?.includes(walletConfig.connectorId) && !walletConfig.networkBlacklist?.includes(chainId)

  return (
    <StyledFlex
      flexDirection='column'
      alignItems='center'
      onClick={!isBlurred ? undefined : onClickHandler}
      isBlurred={!isBlurred}
    >
      <StyledButton
        fullwidth
        variant='tertiary'
        style={{ justifyContent: 'space-between' }}
        id={`wallet-connect-${title.toLocaleLowerCase()}`}
      >
        <Icon width='32px' />
        {selected && <StyledCheckMarkInCircle />}
      </StyledButton>
      <Text color='#8990A5' fontSize='11px' mb='8px' style={{ textAlign: 'center' }}>
        {t(title)}
      </Text>
    </StyledFlex>
  )
}

export default WalletCard

// styles

const StyledButton = styled(Button)`
  position: relative;
  width: 48px;
  height: 48px;
  background: #f5f7ff;
  border-radius: 6px;
  display: flex;
  padding: 0;

  & > * {
    margin: auto;
  }

  svg {
    fill: transparent;
  }
`

const StyledFlex = styled(Flex)<{ isBlurred?: boolean }>`
  & > button {
    border: 1px solid white !important;
    ${({ isBlurred }) => (isBlurred ? 'opacity: 0.5;' : '')}
    transition: border 200ms ease-in-out;
  }

  & > div {
    ${({ isBlurred }) => (isBlurred ? 'opacity: 0.5;' : '')}
    transition: color 200ms ease-in-out;
  }

  ${({ isBlurred }) =>
    isBlurred
      ? `
         & > button {
          background: #f5f7ff !important;
         }
        `
      : `
         &:hover {
          & > button {
           background: #f5f7ff !important;
           border: 1px solid #6c5dd3 !important;
          }
  
          & > div {
           color: #6c5dd3;
          }
        }`}
`

const StyledCheckMarkInCircle = styled(CheckmarkCircleIcon)`
  position: absolute;
  right: -5px;
  top: -5px;
  width: 16px;
  height: 16px;
`
