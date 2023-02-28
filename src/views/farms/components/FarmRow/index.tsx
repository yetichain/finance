import { ChevronDownIcon, ChevronUpIcon } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import React, { useMemo } from 'react'
import { useMedia, useToggle } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import type { FarmCardProps } from '../FarmCard'
import CardHeading from '../FarmCard/CardHeading'
import {
  EarnsFarm,
  InfoApr,
  InfoDeposit,
  InfoDepositFee,
  InfoEarn,
  InfoEarnedElement,
  InfoLpType,
  InfoTitle,
  InfoTotalLiquidity,
  InfoViewBscScan,
  useInfoEarned,
  useInfoStaked,
} from '../Info'
import FarmLargeRow from './FarmLargeRow'
import FarmMobileRow from './FarmMobileRow'

export type FarmRowProps = FarmCardProps & {
  isFinished: boolean
  farmNum: number
  almPrice: BigNumber
}

export interface FarmCells {
  heading: React.ReactNode
  apr: React.ReactNode
  earn: React.ReactNode
  earned: React.ReactNode
  staked: React.ReactNode
  stakedButtonsOrActionsNode: React.ReactNode
  stakedActions: React.ReactNode
  indicator: React.ReactNode
  deposit: React.ReactNode
  totalLiquidity: React.ReactNode
  depositFee: React.ReactNode
  lpType: React.ReactNode
  bscScan: React.ReactNode
  bscScanEnd: React.ReactNode
  harvest: React.ReactNode
  empty: React.ReactNode
}

export interface FarmRowViewsProps {
  farmClassname: string
  cells: FarmCells
  isOpen: boolean
  earned: InfoEarnedElement
  farm: FarmWithStakedValue
  media: {
    isMobile: boolean
    isLGMedia: boolean
    isXlMedia: boolean
  }
}

export default function FarmRow({ isFinished, farm, farmNum, almPrice }: FarmRowProps) {
  const earned = useInfoEarned(farm)
  const staked = useInfoStaked({ farm })
  const [isOpen, toggleOpen] = useToggle(false)
  // medias
  const isMobile = useMedia(`screen and (max-width: 678px)`)
  const isLGMedia = useMedia(`screen and ${mq.down(breakpoints.lg)}`)
  const isXlMedia = useMedia(`screen and ${mq.down(breakpoints.xl)}`)
  const media = { isMobile, isLGMedia, isXlMedia }
  // classes for bg
  const farmClassname = farmNum < 3 ? `farm__row${farmNum}` : 'farm__row'

  const cells = useMemo<FarmCells>(
    () => ({
      heading: (
        <FarmRow.HeadingCell>
          <CardHeading farm={farm} type={ViewMode.TABLE} />
        </FarmRow.HeadingCell>
      ),
      apr: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoApr isFinished={isFinished} farm={farm} almPrice={almPrice} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      earn: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoEarn farm={farm} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      earned: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <FarmRow.StyledInfoTitle>{earned.titleNode}</FarmRow.StyledInfoTitle>
            <EarnsFarm>
              {earned.displayBalanceNode}
              {earned.earningsBusdNode}
            </EarnsFarm>
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      staked: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <FarmRow.StyledInfoTitle>{staked.titleNode}</FarmRow.StyledInfoTitle>
            <EarnsFarm>
              {staked.displayBalanceNode || '-'}
              {staked.balanceNode}
            </EarnsFarm>
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      stakedButtonsOrActionsNode: (
        <FarmRow.CellEnd>
          {!isMobile
            ? staked.stakedBalanceNotZero
              ? staked.stakingButtonsNode
              : staked.actionsNode
            : staked.stakedBalanceNotZero && staked.stakingButtonsNode}
        </FarmRow.CellEnd>
      ),
      stakedActions: <FarmRow.Cell>{staked.actionsNode}</FarmRow.Cell>,
      indicator: (
        <FarmRow.IndicatorCell onClick={toggleOpen}>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </FarmRow.IndicatorCell>
      ),
      deposit: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoDeposit farm={farm} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      totalLiquidity: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoTotalLiquidity farm={farm} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      depositFee: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoDepositFee depositFee={farm?.depositFee} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      lpType: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoLpType />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      bscScan: (
        <FarmRow.Cell>
          <InfoViewBscScan farm={farm} />
        </FarmRow.Cell>
      ),
      bscScanEnd: (
        <FarmRow.CellEnd>
          <InfoViewBscScan farm={farm} />
        </FarmRow.CellEnd>
      ),
      harvest: <FarmRow.Cell>{earned.harvestButtonNode}</FarmRow.Cell>,
      empty: <FarmRow.Cell />,
    }),
    [
      almPrice,
      earned.displayBalanceNode,
      earned.earningsBusdNode,
      earned.harvestButtonNode,
      earned.titleNode,
      farm,
      isMobile,
      isOpen,
      staked.actionsNode,
      staked.balanceNode,
      staked.displayBalanceNode,
      staked.stakedBalanceNotZero,
      staked.stakingButtonsNode,
      staked.titleNode,
      toggleOpen,
    ],
  )

  if (isMobile) {
    return <FarmMobileRow cells={cells} farmClassname={farmClassname} isOpen={isOpen} />
  } else {
    return (
      <FarmLargeRow
        cells={cells}
        farmClassname={farmClassname}
        isOpen={isOpen}
        earned={earned}
        farm={farm}
        media={media}
      />
    )
  }
}

FarmRow.Paper = styled.tr`
  width: 100%;
  border-radius: 6px;
  background: #fff;
`

FarmRow.Cell = styled.td`
  vertical-align: middle;
  padding: 0 12px;
`

FarmRow.CellEnd = styled(FarmRow.Cell)`
  text-align: end;
`

FarmRow.HeadingCell = styled(FarmRow.Cell)`
  min-width: 292px;
  max-width: 292px;
  width: 292px;
  padding: 4px;
  @media ${mq.down(breakpoints.md)} {
    width: 268px;
    max-width: none;
  }

  & > * {
    height: 90px;
  }
  @media ${mq.down(375)} {
    & > * {
      height: 64px;
    }
  }
`

FarmRow.Separator = styled.div`
  height: 4px;
`

FarmRow.IndicatorCell = styled(FarmRow.Cell)`
  cursor: pointer;
  text-align: center;
`

FarmRow.Summary = styled(FarmRow.Paper)``

FarmRow.MobileView = styled(FarmRow.Summary)`
  display: flex;
  flex-direction: column;

  ${FarmRow.HeadingCell} {
    width: 100%;
  }

  & > tr {
    padding: 18px 0;
    width: 100%;
    display: flex;
    align-items: center;
    &:first-child {
      @media ${mq.down(375)} {
        padding: 0;
      }
    }

    & > * {
      flex: 1;
    }
  }

  ${FarmRow.IndicatorCell} {
    margin-left: auto;
    text-align: right;
  }
`

FarmRow.Details = styled(FarmRow.Paper)`
  ${FarmRow.Cell} {
    padding-top: 22px;
    padding-bottom: 22px;
  }
`

FarmRow.DetailsTable = styled.table`
  width: 100%;
`

FarmRow.Field = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24px 24px;
  align-items: center;
  gap: 8px;
  width: 100%;
`

FarmRow.MultipleField = styled.div`
  display: flex;
  justify-content: space-between;
`

FarmRow.StyledInfoTitle = styled(InfoTitle)`
  & {
    white-space: nowrap;
  }
`
