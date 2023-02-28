import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

const ToolbarAction = styled.button`
  padding: 12px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  @media ${mq.down(breakpoints.sm)} {
    padding: 8px;
  }
`

export default ToolbarAction
