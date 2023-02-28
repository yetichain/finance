import { Skeleton } from 'alium-uikit/src'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import { useFarmsLoading } from 'views/farms/hooks/useFarmingPools'
import DetailsButton from 'views/StrongHoldersPool/components/DetailsButton'
import { InfoDeposit, InfoLpType, InfoViewBscScan } from '../Info'

const Wrapper = styled.div<{ open: boolean }>`
  padding: 0 16px 24px 16px;
  position: absolute;
  width: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;
  z-index: 9;
  .hide {
    width: fit-content;
    margin-top: 8px;
    float: right;
    cursor: pointer;
  }
  height: ${(props) => (props.open ? '204px' : '0px')};
  bottom: ${(props) => (props.open ? '-194px;' : '0')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: 0.3s all ease;
  overflow: hidden;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 32px;
  align-items: center;
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  .field {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  .scan-link {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
    border-bottom: 1px solid #6c5dd3;
    padding-bottom: 4px;
  }
`

const DetailsLabel = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export interface ExpandableSectionProps {
  bscScanAddress?: string
  lpLabel?: string
  farm: FarmWithStakedValue
}

const DetailsSection: React.FC<ExpandableSectionProps> = ({ bscScanAddress, lpLabel, farm }) => {
  const { t } = useTranslation()
  const loading = useFarmsLoading()

  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }

  const totalLiqudidty = farm.liqudity + '$'

  return (
    <>
      {!open && (
        <DetailsLabel onClick={toggle}>
          <DetailsButton className='hide' isOpen={open} onClick={toggle} />
        </DetailsLabel>
      )}
      <Wrapper open={open}>
        {open && (
          <>
            <Info>
              <InfoDeposit farm={farm} />
            </Info>
            <Info>
              <div className='title'>{t('Total Liquidity')}</div>
              <div className='field'>{!loading ? <p>{totalLiqudidty}</p> : <Skeleton width={75} height={25} />}</div>
            </Info>
            <Info>
              <div className='title'>{t('Deposit fee')}</div>
              <div className='field'>
                {!loading ? `${farm?.depositFee || 0}%` : <Skeleton width={75} height={25} />}
              </div>
            </Info>
            <Info>
              <InfoLpType />
            </Info>
            <Info>
              <InfoViewBscScan farm={farm} />
            </Info>
            <DetailsButton className='hide' isOpen={open} onClick={toggle} />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default DetailsSection
