import BigNumber from 'bignumber.js'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { FarmTab, FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import { farmBgForNthChild, farmCardsBg } from 'views/farms/helpers/farms.styles'
import FarmCard from '../FarmCard'
import FarmRow from '../FarmRow'

export interface FarmContentProps {
  viewMode: ViewMode
  farms: FarmWithStakedValue[]
  almPrice: BigNumber
}

export default function FarmContent({ viewMode, farms, almPrice }: FarmContentProps) {
  const activeTab = useStoreFarms((state) => state.activeTab)
  const isFinished = FarmTab.finished === activeTab

  switch (viewMode) {
    case ViewMode.CARD:
      return (
        <FarmContent.Grid>
          {farms?.length
            ? farms.map((farm, index) => (
                <FarmCard isFinished={isFinished} key={index} farm={farm} almPrice={almPrice} />
              ))
            : ''}
        </FarmContent.Grid>
      )
    case ViewMode.TABLE:
      return (
        <FarmContent.Table>
          <tbody>
            {farms?.length
              ? farms.map((farm, index) => (
                  <FarmRow isFinished={isFinished} farmNum={index} key={index} farm={farm} almPrice={almPrice} />
                ))
              : ''}
          </tbody>
        </FarmContent.Table>
      )
  }
}

FarmContent.Container = styled.div`
  .farm__row,
  .farm__card {
    .farm__head {
      background-size: contain;
      ${farmCardsBg[0]}
      background-repeat: no-repeat;
    }
  }
  .farm__card {
    ${farmBgForNthChild(1)};
    ${farmBgForNthChild(2)};
    ${farmBgForNthChild(3)};
  }
  .farm__row {
    .farm__head {
      ${farmCardsBg[0]};
    }
  }
  .farm__row0 {
    .farm__head {
      ${farmCardsBg[1]};
    }
  }
  .farm__row1 {
    .farm__head {
      ${farmCardsBg[2]};
    }
  }
  .farm__row2 {
    .farm__head {
      ${farmCardsBg[3]};
    }
  }
`

export const FarmContentXLGap = 150
FarmContent.Grid = styled.div`
  display: grid;
  gap: 34px 30px;
  grid-template-columns: repeat(4, 378px);
  justify-content: center;

  @media ${mq.down(breakpoints.xl)} {
    grid-template-columns: repeat(3, 354px);
  }

  @media ${mq.down(breakpoints.lg)} {
    gap: 24px 16px;
    grid-template-columns: repeat(2, 354px);
  }

  @media ${mq.down(breakpoints.sm)} {
    gap: 16px;
    grid-template-columns: repeat(1, 354px);
  }
`

FarmContent.Table = styled.table`
  width: 100%;
`
