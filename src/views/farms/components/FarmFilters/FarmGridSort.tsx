import { FARM_MOBILE_MEDIA, FARM_TABLET_MEDIA } from 'constants/layout/farm.layout'
import { SortCardIcon } from 'images/farms/icons/sort-card-icon'
import { SortTableIcon } from 'images/farms/icons/sort-table-icon'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'
import { ViewMode } from 'views/farms/farms.types'

const ClickableIcon = styled.div<{ active: boolean }>`
  cursor: pointer;

  svg {
    path {
      ${(props) => props.active && 'stroke: #6C5DD3;'}
    }
  }
`

export const FarmGridSort = () => {
  const viewMode = useStoreFarms((state) => state.viewMode)
  const setViewMode = useStoreFarms((state) => state.setViewMode)
  const changeActive = (view: ViewMode) => {
    setViewMode(view)
  }

  const isCardView = ViewMode.CARD === viewMode
  const isTableView = ViewMode.TABLE === viewMode
  return (
    <Wrapper>
      <ClickableIcon onClick={() => changeActive(ViewMode.CARD)} active={isCardView}>
        <SortCardIcon />
      </ClickableIcon>
      <ClickableIcon active={isTableView} onClick={() => changeActive(ViewMode.TABLE)}>
        <SortTableIcon />
      </ClickableIcon>
    </Wrapper>
  )
}

// styles

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
`
