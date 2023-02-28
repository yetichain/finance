import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'

const ToolbarTitle = styled.div`
  ${typography.h2}
  color: #0B1359;

  @media ${mq.down(breakpoints.md)} {
    ${typography.h4}
  }

  @media ${mq.down(breakpoints.sm)} {
    ${typography.h5}
  }
`

export default ToolbarTitle
