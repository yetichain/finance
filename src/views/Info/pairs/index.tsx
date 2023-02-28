import { useTranslation } from 'next-i18next'
import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarActions from '../components/Toolbar/ToolbarActions'
import ToolbarRow from '../components/Toolbar/ToolbarRow'
import ToolbarTitle from '../components/Toolbar/ToolbarTitle'
import TopPairsTable from '../components/TopPairsTable'
import { getInfoLayout } from '../Layout'

export default function InfoPairs() {
  const { t } = useTranslation()
  return (
    <>
      <Toolbar>
        <ToolbarRow>
          <ToolbarTitle>{t('Top pairs')}</ToolbarTitle>
          <ToolbarActions />
        </ToolbarRow>
      </Toolbar>
      <TopPairsTable hiddenTitle />
    </>
  )
}

InfoPairs.getLayout = getInfoLayout
