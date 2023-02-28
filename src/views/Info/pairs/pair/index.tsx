import ConnectionLoad from 'alium-uikit/src/components/ConnectionLoad'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import Breadcrumbs from 'views/Info/components/Breadcrumbs'
import TransactionsTable from 'views/Info/components/TransactionsTable'
import { usePairByTokensQuery } from 'views/Info/generated'
import { getInfoLayout } from 'views/Info/Layout'
import { getPairName } from 'views/Info/utils/pairs'
import PairCharts from './components/PairCharts'
import PairCounters from './components/PairCounters'
import PairInformation from './components/PairInformation'
import PairToolbar from './components/PairToolbar'

export default function InfoPair() {
  const { t } = useTranslation()
  const router = useRouter()
  const { token0, token1 } = router.query
  const { data } = usePairByTokensQuery({
    variables: {
      token0: token0 as string,
      token1: token1 as string,
    },
  })

  if (!data) {
    return <ConnectionLoad load />
  }

  const pair = data.pairs[0]

  if (!pair) {
    // TODO: not found page
    return <>Not found</>
  }

  return (
    <InfoPair.Root>
      <Breadcrumbs
        items={[
          {
            title: t('Pairs'),
            href: '/info/pairs',
          },
          {
            title: t('{{name}} Pair', { name: getPairName(pair.token0.symbol, pair.token1.symbol) }),
            href: `/info/pairs/${pair.token0.id}/${pair.token1.id}`,
          },
        ]}
      />
      <PairToolbar pair={pair} />
      <InfoPair.Content>
        <InfoPair.Main>
          <PairCounters pair={pair} />
          <PairCharts pair={pair} />
        </InfoPair.Main>
        <TransactionsTable pair={pair.id} />
        <PairInformation pair={pair} />
      </InfoPair.Content>
    </InfoPair.Root>
  )
}

InfoPair.Main = styled.div`
  display: grid;
  grid-template-columns: 354px 1fr;
  gap: 30px;
`

InfoPair.Content = styled.div`
  display: grid;
  gap: 40px;
`

InfoPair.Root = styled.div`
  @media ${mq.down(breakpoints.lg)} {
    ${InfoPair.Main} {
      grid-template-columns: 309px 1fr;
      gap: 24px;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    ${InfoPair.Main} {
      grid-template-columns: auto;
      gap: 32px;
    }

    ${InfoPair.Content} {
      gap: 32px;
    }
  }
`

InfoPair.getLayout = getInfoLayout
