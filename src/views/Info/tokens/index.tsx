import { useTranslation } from 'next-i18next'
import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarActions from '../components/Toolbar/ToolbarActions'
import ToolbarRow from '../components/Toolbar/ToolbarRow'
import ToolbarTitle from '../components/Toolbar/ToolbarTitle'
import TopTokensTable from '../components/TopTokensTable'
import { getInfoLayout } from '../Layout'

export default function InfoTokens() {
  const { t } = useTranslation()
  return (
    <>
      <Toolbar>
        <ToolbarRow>
          <ToolbarTitle>{t('Top Tokens')}</ToolbarTitle>
          <ToolbarActions />
        </ToolbarRow>
      </Toolbar>
      <TopTokensTable hiddenTitle />
    </>
  )
}

InfoTokens.getLayout = getInfoLayout
