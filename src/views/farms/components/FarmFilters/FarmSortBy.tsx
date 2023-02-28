import { DropdownList } from 'alium-uikit/src/components/DropdownList'
import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { FarmSortOption } from 'views/farms/farms.types'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 24px;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-right: 16px;
  }

  @media ${mq.down(breakpoints.lg)} {
    margin-right: 64px;

    h2 {
      display: none;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    margin-left: 16px;
  }

  @media ${mq.down(breakpoints.sm)} {
    margin-right: 64px;
  }
`

const StyledDropdown = styled(DropdownList)`
  width: 220px;

  @media ${mq.down(breakpoints.lg)} {
    width: 192px;
  }

  @media ${mq.down(breakpoints.md)} {
    width: 170px;
  }
`

export const FarmSortBy = () => {
  const { t } = useTranslation()
  const sortOption = useStoreFarms((state) => t(state.sortOption))
  const setSortOption = useStoreFarms((state) => state.setSortOption)
  const list = Object.values(FarmSortOption).map((opt) => t(opt))

  return (
    <Wrapper>
      <h2>{t('Sort by')}</h2>
      <StyledDropdown list={list} active={sortOption} select={(item: FarmSortOption) => setSortOption(item)} />
    </Wrapper>
  )
}
