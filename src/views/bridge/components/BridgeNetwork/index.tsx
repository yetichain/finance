import { Skeleton } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import React, { FC, useRef, useState } from 'react'
import { BridgeNetworks } from 'store/bridge/types'
import { networkFinder, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { BridgeToken } from 'utils/bridge/entities/BridgeToken'
import DropdownBridgeNetworks from '../DropdownBridgeNetworks'
import BridgeScan from '../Popups/BridgeScan'
import { ReactComponent as MoreIcon } from './more.svg'

interface Props {
  type: BridgeNetworks
  value: string
  token: BridgeToken
  balanceLoading: boolean
}

const SkeletonNetwork = () => {
  return (
    <div className='left-column'>
      <div className='network'>
        <StyledSkeleton width={128} />
      </div>
      <div className='token'>
        <StyledSkeleton width={40} />
      </div>
    </div>
  )
}

const BridgeNetwork: FC<Props> = ({ type, value, token, balanceLoading }) => {
  const { t } = useTranslation()
  const dropdownRef = useRef<{ toggle: () => any }>()
  const [modalOpen, setModalOpen] = useState(false)
  const chainId = useStoreBridge((state) => state[type])
  const network = networkFinder(chainId)
  const Icon = network?.icon
  const loading = balanceLoading || !token

  const onShow = () => {
    setModalOpen(true)
  }

  return (
    <Network>
      {modalOpen && <BridgeScan type={type} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      {loading ? (
        <SkeletonNetwork />
      ) : (
        <div className='left-column'>
          <div className='network'>
            {Icon && <Icon />}
            <p onClick={() => dropdownRef.current?.toggle()} className='title'>
              {t(network?.label)}
            </p>
            <DropdownBridgeNetworks dropdownRef={dropdownRef} type={type} />
          </div>
          <div className='token'>
            {value || 0} {token?.symbol}
          </div>
        </div>
      )}
      <div className='right-column'>
        <div onClick={onShow}>
          <MoreIcon />
        </div>
      </div>
    </Network>
  )
}

export default BridgeNetwork

// styles

const Network = styled.div`
  width: 100%;
  min-height: 98px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 18px 34px 24px 16px;
  border: 1px solid #f5f7ff;
  box-sizing: border-box;
  box-shadow: 0 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 6px;
  margin-top: 24px;
  margin-bottom: 24px;

  .network {
    display: flex;
    align-items: center;

    .title {
      padding-left: 9px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.1px;
      color: #0b1359;
      padding-right: 27px;
      cursor: pointer;

      @media screen and (max-width: 768px) {
        padding-right: 9px;
      }
    }

    padding-bottom: 10px;
  }

  .token {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  .right-column {
    display: flex;
    align-items: center;

    & > div {
      display: flex;
      align-items: center;
      padding: 4px;
    }

    svg {
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        opacity: 0.5;
      }
    }
  }
`

const StyledSkeleton = styled(Skeleton)`
  padding: 0;
  margin: 0;
  height: 28px;
`
