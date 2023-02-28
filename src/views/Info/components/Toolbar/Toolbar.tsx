import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import { breakpoints, mq } from 'ui'

export type ToolbarProps = inferStyledProps<typeof Toolbar>

const Toolbar = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 40px;

  @media ${mq.down(breakpoints.lg)} {
    margin-bottom: 32px;
  }

  @media ${mq.down(breakpoints.md)} {
    gap: 16px;
  }

  @media ${mq.down(breakpoints.sm)} {
    margin-bottom: 24px;
  }
`

export default Toolbar
