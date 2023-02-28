import { Skeleton } from 'alium-uikit/src'
import CurrencyLogo from 'components/CurrencyLogo'
import React from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import { useFarmsLoading } from 'views/farms/hooks/useFarmingPools'
import { useFarmLpLabel } from '../Info'

export interface CardHeadingProps {
  farm: FarmWithStakedValue
  type: ViewMode
}

const Wrapper = styled.div`
  border-radius: 6px;
  width: 100%;
  height: 116px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0px 24px 0px 20px;
  align-items: center;
`

const Info = styled.div<{ type: ViewMode }>`
  .label {
    text-align: right;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
    margin-bottom: 8px;
    color: #ffffff;
  }
  @media ${mq.down(breakpoints.sm)} {
    ${({ type }) =>
      type === ViewMode.TABLE &&
      `
      display: flex;
      align-items: center;
      .label{
        font-size: 18px;
        margin-right: 8px;
        margin-bottom: 0px;
      }
    `}
  }
`

const Tags = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Core = styled.div<{ type: ViewMode }>`
  margin-right: 4px;
  background: rgba(41, 217, 143, 0.3);
  border: 1px solid #29d98f;
  box-sizing: border-box;
  border-radius: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #29d98f;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 3px 8px 3px 3px;
  span {
    margin-right: 6px;
    width: 24px;
    height: 24px;
    left: 3px;
    top: 3px;
    background: #29d98f;
    border-radius: 14px;
    display: block;
  }
  @media ${mq.down(breakpoints.sm)} {
    ${({ type }) =>
      type === ViewMode.TABLE &&
      `
      padding: 0;
      padding-left: 1px;
      width: 58px;
      height: 22px;
      span{
        height: 18px;
        width: 18px;
      }
    `}
  }
`
const Multiplier = styled.div<{ type: ViewMode }>`
  background: rgba(255, 161, 0, 0.3);
  border: 1px solid #ffa100;
  box-sizing: border-box;
  border-radius: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #ffa100;
  padding: 8px 10px 8px 10px;
  width: fit-content;
  min-width: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${mq.down(breakpoints.sm)} {
    ${({ type }) =>
      type === ViewMode.TABLE &&
      `
      height: 22px;
      padding: 0;
      margin: 0;
      width: fit-content;
      min-width: 31px;
    `}
  }
`
const DoubleLogo = styled.div<{ type: ViewMode }>`
  display: flex;

  @media ${mq.down(breakpoints.sm)} {
    ${({ type }) =>
      type === ViewMode.TABLE &&
      `
      img {
        width: 35px;
        height: 35px;
      }
    `}
  }
`

const WrapMainLogo = styled.div`
  position: relative;
  z-index: 1;
`
const WrapSecondLogo = styled.div<{ type: ViewMode }>`
  position: relative;
  z-index: 0;
  right: 20px;
  @media ${mq.down(breakpoints.sm)} {
    ${({ type }) =>
      type === ViewMode.TABLE &&
      `
      right: 13px;
    `}
  }
`

const MultiplierSkeleton = styled(Skeleton)`
  border-radius: 16px;
`

const CardHeading: React.FC<CardHeadingProps> = ({ farm, type }) => {
  const loading = useFarmsLoading()
  return (
    <Wrapper className='farm__head'>
      <div className='icons'>
        <DoubleLogo type={type}>
          <WrapMainLogo>
            <CurrencyLogo size='48px' currency={farm.token} />
          </WrapMainLogo>
          <WrapSecondLogo type={type}>
            <CurrencyLogo size='48px' currency={farm.quoteToken} />
          </WrapSecondLogo>
        </DoubleLogo>
      </div>
      <Info type={type}>
        <div className='label'>{useFarmLpLabel(farm).split(' ')[0]}</div>
        <Tags>
          <Core type={type}>
            <span />
            {farm.isCommunity ? 'Community' : 'Core'}
          </Core>
          {loading ? (
            <MultiplierSkeleton width='41px' height='32px' />
          ) : (
            <Multiplier type={type}>{farm.multiplier}</Multiplier>
          )}
        </Tags>
      </Info>
    </Wrapper>
  )
}

export default CardHeading
