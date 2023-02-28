import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import ToolbarBookmark from './ToolbarBookmark'
import ToolbarSearch from './ToolbarSearch'

export default function ToolbarActions() {
  return (
    <ToolbarActions.Root>
      <ToolbarSearch />
      <ToolbarBookmark />
    </ToolbarActions.Root>
  )
}

ToolbarActions.Root = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 16px;
  }

  @media ${mq.down(breakpoints.sm)} {
    & > * + * {
      margin-left: 8px;
    }
  }
`
