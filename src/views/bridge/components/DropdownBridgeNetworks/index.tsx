import { getBridgeNetworks } from 'alium-uikit/src/widgets/WalletModal/config'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { useTranslation } from 'next-i18next'
import React, { FC, Ref, useCallback, useImperativeHandle, useRef } from 'react'
import { BridgeNetworks } from 'store/bridge/types'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'

const Chevron = () => {
  return (
    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 1.50012L5.99638 6.50012L1.00001 1.50012'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

interface Props {
  type: BridgeNetworks
  dropdownRef: Ref<{ toggle: () => any }>
}

const DropdownBridgeNetworks: FC<Props> = ({ type, dropdownRef }) => {
  const { t } = useTranslation()
  const [show, setShow] = React.useState(false)
  const networks = getBridgeNetworks()
  const dropdown = useRef()
  useOnClickOutside(dropdown, () => {
    setShow(false)
  })

  const from = useStoreBridge((state) => state.fromNetwork)
  const to = useStoreBridge((state) => state.toNetwork)
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const setToNetwork = useStoreBridge((state) => state.setToNetwork)

  const activeNetworks = [from, to]

  const toggle = useCallback(() => {
    setShow((prev) => !prev)
  }, [])

  useImperativeHandle(
    dropdownRef,
    () => ({
      toggle,
    }),
    [toggle],
  )

  const isActiveNetwork = (chainId: number) => {
    return activeNetworks.includes(chainId)
  }

  const changeNetwork = (chainId: number) => {
    if (!isActiveNetwork(chainId)) {
      if (type === 'fromNetwork') {
        setChainId(chainId)
      }
      if (type === 'toNetwork') {
        setToNetwork(chainId)
      }
      toggle()
    }
  }

  return (
    <Wrapper>
      <Icon onClick={toggle}>
        <Chevron />
      </Icon>

      {show && (
        <Dropdown ref={dropdown}>
          {networks.map(({ icon: NetworkIcon, title, chainId }, index) => (
            <DropdownItem
              key={chainId}
              active={isActiveNetwork(chainId)}
              onClick={() => {
                changeNetwork(chainId)
              }}
            >
              {NetworkIcon && <NetworkIcon />}
              <p className='network__title'>{t(title)}</p>
              {index === 0 && (
                <DropdownChevron onClick={toggle}>
                  <Chevron />
                </DropdownChevron>
              )}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  )
}

export default DropdownBridgeNetworks

// styles

const Wrapper = styled.div`
  position: relative;
`

const Icon = styled.div`
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    opacity: 0.7;
  }
`

const DropdownChevron = styled(Icon)`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  svg {
    transform: rotate(180deg);
  }
`

const Dropdown = styled.div`
  position: absolute;
  width: 146px;
  height: auto;
  background: #ffffff;
  box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;
  padding: 8px;
  top: -16px;
  left: -112px;
  z-index: 99;
`

const DropdownItem = styled.div<{ active: boolean }>`
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    background: #f5f7ff;
    border-radius: 6px;
  }

  .network__title {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: ${(props) => (props.active ? '#8990A5' : '#0b1359')};
    padding-left: 13px;
  }
`
