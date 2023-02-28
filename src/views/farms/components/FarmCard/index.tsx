import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import DetailsSection from '../DetailsSection'
import { EarnsFarm, InfoApr, InfoEarn, InfoRow, InfoTitle, InfoValue, useInfoEarned, useInfoStaked } from '../Info'
import CardHeading from './CardHeading'

const StyledCard = styled.div`
  height: 100%;
  background: #ffffff;
  border-radius: 6px;
  padding: 4px 4px 24px 4px;
  position: relative;
  @media ${mq.down(breakpoints.sm)} {
    width: 100%;
  }
`

export const ContentCard = styled.div`
  padding: 0px 16px 0px 16px;
`

const FooterCard = styled.div<{ isSingle: boolean }>`
  margin-top: 16px;
  display: flex;
  justify-content: ${(props) => (props.isSingle ? 'flex-end' : 'space-between')};
`

export interface FarmCardProps {
  isFinished?: boolean
  farm: FarmWithStakedValue
  almPrice: BigNumber
  removed?: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ isFinished, farm, almPrice, removed }) => {
  const earned = useInfoEarned(farm)
  const staked = useInfoStaked({
    farm,
  })

  return (
    <StyledCard className='farm__card'>
      <CardHeading farm={farm} type={ViewMode.CARD} />
      <ContentCard>
        <InfoRow>
          <InfoApr isFinished={isFinished} farm={farm} almPrice={almPrice} />
        </InfoRow>
        <InfoRow withBg>
          <InfoEarn farm={farm} />
        </InfoRow>
        <InfoRow style={{ minHeight: '70px' }}>
          <InfoTitle>
            {earned.titleNode}
            <EarnsFarm>
              {earned.displayBalanceNode}
              {earned.earningsBusdNode}
            </EarnsFarm>
          </InfoTitle>
          <InfoValue>{earned.harvestButtonNode}</InfoValue>
        </InfoRow>
        <InfoRow withBg>
          <InfoTitle>
            <p>{staked.titleNode}</p>
            <EarnsFarm>
              <p>{staked.displayBalanceNode}</p>
              <p> {staked.balanceNode}</p>
            </EarnsFarm>
          </InfoTitle>
          <InfoValue>{staked.stakingButtonsNode}</InfoValue>
        </InfoRow>
        <FooterCard isSingle={!staked.actionsNode}>
          {staked.actionsNode}
          <DetailsSection farm={farm} />
        </FooterCard>
      </ContentCard>
    </StyledCard>
  )
}

export default FarmCard
