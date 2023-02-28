import styled from 'styled-components'
import { ReactComponent as SearchIcon } from './assets/search.svg'
import ToolbarAction from './ToolbarAction'

export default function ToolbarSearch() {
  return (
    <ToolbarSearch.Root>
      <SearchIcon />
    </ToolbarSearch.Root>
  )
}

ToolbarSearch.Root = styled(ToolbarAction)`
  background: #e6e6f6;
`
