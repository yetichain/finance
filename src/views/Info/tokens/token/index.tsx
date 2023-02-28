import ConnectionLoad from 'alium-uikit/src/components/ConnectionLoad'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import Breadcrumbs from 'views/Info/components/Breadcrumbs'
import TopPairsTable from 'views/Info/components/TopPairsTable'
import TransactionsTable from 'views/Info/components/TransactionsTable'
import { useTokenQuery } from 'views/Info/generated'
import { getInfoLayout } from 'views/Info/Layout'
import { formatTokenSymbol } from 'views/Info/utils'
import { formatAddress } from 'views/StrongHoldersPool/utils'
import TokenCharts from './components/TokenCharts'
import TokenCounters from './components/TokenCounters'
import TokenInformation from './components/TokenInformation'
import TokenToolbar from './components/TokenToolbar'

export default function InfoToken() {
  const { t } = useTranslation()
  const router = useRouter()
  const id = router.query.id as string
  const { data: tokenData } = useTokenQuery({
    variables: {
      id,
    },
  })

  if (!tokenData) {
    return <ConnectionLoad load />
  }

  if (!tokenData.token) {
    // TODO: not found page
    return <>Not found</>
  }

  return (
    <InfoToken.Root>
      <Breadcrumbs
        items={[
          {
            title: t('Tokens'),
            href: '/info/tokens',
          },
          {
            title: (
              <>
                {formatTokenSymbol(tokenData.token.symbol)}&nbsp;
                <span style={{ color: '#6C5DD3' }}>({formatAddress(tokenData.token.id, 8, 6)})</span>
              </>
            ),
            href: `/info/tokens/${tokenData.token.id}`,
          },
        ]}
      />
      <TokenToolbar token={tokenData.token} />
      <InfoToken.Content>
        <InfoToken.Main>
          <TokenCounters token={tokenData.token} />
          <TokenCharts token={tokenData.token.id} />
        </InfoToken.Main>
        <TopPairsTable token={tokenData.token.id} />
        <TransactionsTable token={tokenData.token.id} />
        <TokenInformation token={tokenData.token} />
      </InfoToken.Content>
    </InfoToken.Root>
  )
}

InfoToken.Main = styled.div`
  display: grid;
  grid-template-columns: 309px 1fr;
  gap: 30px;
`

InfoToken.Content = styled.div`
  display: grid;
  gap: 40px;
`

InfoToken.Root = styled.div`
  @media ${mq.down(breakpoints.lg)} {
    ${InfoToken.Main} {
      gap: 24px;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    ${InfoToken.Main} {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    ${InfoToken.Content} {
      gap: 32px;
    }
  }
`

InfoToken.getLayout = getInfoLayout
