import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { FarmGridSort } from './FarmGridSort'
import FarmSearch from './FarmSearch'
import { FarmSortBy } from './FarmSortBy'
import { FarmStakedSwitcher } from './FarmStakedSwitcher'
import { FarmTabs } from './FarmTabs'

const Container = styled.div`
  position: relative;
  bottom: 40px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 6px;

  @media ${mq.down(breakpoints.sm)} {
    margin-left: 8px;
    margin-right: 8px;
  }
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media ${mq.down(breakpoints.sm)} {
    flex-direction: column;
  }
`
const LeftPart = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;

  @media ${mq.down(breakpoints.sm)} {
    margin-bottom: 16px;
  }
`
const RightPart = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  align-self: flex-end;

  @media ${mq.down(breakpoints.sm)} {
    /* align-self: flex-end; */
  }
`

const FarmFilters = () => {
  return (
    <Container>
      <Wrapper>
        <LeftPart>
          <FarmTabs />
          <FarmStakedSwitcher />
        </LeftPart>
        <RightPart>
          <FarmGridSort />
          <FarmSortBy />
          <FarmSearch />
        </RightPart>
      </Wrapper>
    </Container>
  )
}

export default FarmFilters
