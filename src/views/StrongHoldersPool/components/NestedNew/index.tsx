import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import JoinPoolCard from '../JoinPoolCard'
import LockedInPoolsCard from '../LockedInPoolsCard'
import MyPoolAmountCard from '../MyPoolAmountCard'
import OpenedPoolsCard from '../OpenedPoolsCard'

export default function NestedNew() {
  return (
    <NestedNew.Root>
      <JoinPoolCard />
      <NestedNew.Stats>
        <MyPoolAmountCard />
        <OpenedPoolsCard />
        <LockedInPoolsCard />
      </NestedNew.Stats>
    </NestedNew.Root>
  )
}

NestedNew.Stats = styled.div`
  display: grid;
  gap: 30px;

  @media ${mq.down(breakpoints.lg)} {
    gap: 16px;
    grid-row: 1;
  }
`

NestedNew.Root = styled.div`
  display: grid;
  gap: 30px;
  grid-auto-flow: column;

  @media ${mq.down(breakpoints.lg)} {
    gap: 16px;
    grid-auto-flow: row;
  }

  @media ${mq.down(breakpoints.sm)} {
    margin-top: 16px;
  }
`
