import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Flex from '../../components/Flex/Flex'
import { CheckmarkCircleIcon } from '../../components/Svg'
import Text from '../../components/Text/Text'
import { NetworksConfig } from './types'

interface Props {
  selected?: boolean
  title?: string
  setSelectedNetwork: (arg0: string) => void
  networkConfig: NetworksConfig
  chainId: string
}

const NetworkSelector: FC<Props> = ({ chainId, selected, networkConfig, setSelectedNetwork }) => {
  const { t } = useTranslation()
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const { label, title, icon: Icon } = networkConfig

  const handleClick = () => {
    setSelectedNetwork(label)
    setChainId(Number(chainId))
  }

  return (
    <StyledFlex flexDirection='column' alignItems='center' onClick={handleClick}>
      <StyledNetworkSelector>
        {selected && <StyledCheckMarkInCircle />}
        <Icon />
      </StyledNetworkSelector>
      <Text color='#8990A5' fontSize='11px' mb='10px' style={{ userSelect: 'none' }}>
        {t(title)}
      </Text>
    </StyledFlex>
  )
}

export default NetworkSelector

// styles

const StyledNetworkSelector = styled(Button)`
  position: relative;
  width: 48px;
  height: 48px;
  background: #f5f7ff;
  border-radius: 6px;
  display: flex;
  padding: 0;

  > * {
    margin: auto;
  }
`

const StyledCheckMarkInCircle = styled(CheckmarkCircleIcon)`
  position: absolute;
  right: -5px;
  top: -5px;
  width: 16px;
  height: 16px;
`

const StyledFlex = styled(Flex)`
  & > button {
    border: 1px solid white !important;
    transition: border 200ms ease-in-out;
  }

  & > div {
    transition: color 200ms ease-in-out;
  }

  &:hover {
    & > button {
      background: #f5f7ff !important;
      border: 1px solid #6c5dd3 !important;
    }

    & > div {
      color: #6c5dd3;
    }
  }
`
