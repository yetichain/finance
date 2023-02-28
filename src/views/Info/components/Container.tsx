import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

const Container = styled.div`
  padding: 40px 0;
  margin: 0 auto;
  max-width: 1122px;
  width: 100%;

  @media ${mq.down(breakpoints.lg)} {
    max-width: none;
    padding: 32px 24px;
  }

  @media ${mq.down(breakpoints.md)} {
    padding: 24px;
  }

  @media ${mq.down(breakpoints.md)} {
    padding: 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    padding: 24px 10px;
  }
`

export default Container
