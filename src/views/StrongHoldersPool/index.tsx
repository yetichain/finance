import { MENU_HEIGHT } from 'alium-uikit/src/widgets/Menu/config'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import AvailableAccount from 'views/InvestorsAccount/components/AvailableAccount'
import Header from './components/Header'
import NestedNew from './components/NestedNew'
import NestedYour from './components/NestedYour'

export default function StrongHoldersPool() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <AvailableAccount title={t('Strong Holders Pool')}>
      <StrongHoldersPool.Root>
        <Header />
        {router.pathname === ROUTES.shp && <NestedNew />}
        {router.pathname === ROUTES.shpYour && <NestedYour />}
      </StrongHoldersPool.Root>
    </AvailableAccount>
  )
}

StrongHoldersPool.Root = styled.div`
  margin: 0 auto;
  padding: 16px 33px 16px 29px;
  max-width: 1184px;
  min-height: calc(100vh - ${MENU_HEIGHT}px);
  position: relative;

  @media ${mq.down(breakpoints.lg)} {
    padding: 16px 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    padding: 32px 10px;
  }
`
