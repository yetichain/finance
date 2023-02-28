import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import InfoHeadline from './components/InfoHeadline'
import OverviewCharts from './components/OverviewCharts'
import Toolbar from './components/Toolbar/Toolbar'
import ToolbarActions from './components/Toolbar/ToolbarActions'
import ToolbarRow from './components/Toolbar/ToolbarRow'
import ToolbarTitle from './components/Toolbar/ToolbarTitle'
import TopPairsTable from './components/TopPairsTable'
import TopTokensTable from './components/TopTokensTable'
import TransactionsTable from './components/TransactionsTable'
import { getInfoLayout } from './Layout'

export default function Info() {
  const { t } = useTranslation()
  return (
    <Info.Root>
      <Toolbar>
        <ToolbarRow>
          <ToolbarTitle>{t('Analytics')}</ToolbarTitle>
          <ToolbarActions />
        </ToolbarRow>
        <ToolbarRow>
          <InfoHeadline />
        </ToolbarRow>
      </Toolbar>
      <Info.Content>
        <OverviewCharts />
        <TopTokensTable seeAllHref='/info/tokens' />
        <TopPairsTable seeAllHref='/info/pairs' />
        <TransactionsTable />
      </Info.Content>
    </Info.Root>
  )
}

Info.Content = styled.div`
  display: grid;
  gap: 40px;
`

Info.Root = styled.div``

Info.getLayout = getInfoLayout
