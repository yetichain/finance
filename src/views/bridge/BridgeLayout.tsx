import { BridgeProvider } from 'contexts/BridgeContext'
import { useTranslation } from 'next-i18next'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import BridgeConnectWallet from './components/BridgeConnectWallet'
import PopupsBridge from './components/Popups'

export interface BridgeLayoutProps {
  children: ReactNode
}

export default function BridgeLayout({ children }: BridgeLayoutProps) {
  const { t } = useTranslation()
  return (
    <BridgeProvider>
      <PopupsBridge />
      <BridgeLayout.Root>
        <BridgeLayout.Content>
          <BridgeLayout.Title>{t('Bridge')}</BridgeLayout.Title>
          <Card>
            <BridgeConnectWallet>{children}</BridgeConnectWallet>
          </Card>
        </BridgeLayout.Content>
      </BridgeLayout.Root>
    </BridgeProvider>
  )
}

BridgeLayout.Title = styled.h2`
  ${typography.h2}
  color: #0B1359;
  margin-bottom: 24px;
`

BridgeLayout.Content = styled.div`
  max-width: 930px;
  margin: 0 auto;
  padding: 48px 0;
`

BridgeLayout.Root = styled.div`
  background: url('/images/trade-background.svg');
  background-repeat: no-repeat;
  background-position: top 23px right;
  min-height: 100vh;

  @media ${mq.down(breakpoints.lg)} {
    background-position: top 23px right -100px;

    ${BridgeLayout.Content} {
      padding: 48px 24px 32px;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    background-position: top 23px right -120px;

    ${BridgeLayout.Content} {
      padding: 38px 24px 24px;
    }

    ${BridgeLayout.Title} {
      ${typography.h4}
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    background-position: top center;
    background-size: contain;

    ${BridgeLayout.Content} {
      padding: 137px 10px 48px;
    }

    ${BridgeLayout.Title} {
      ${typography.h5}
      text-align: center;
    }
  }
`

export const getBridgeLayout = (page: ReactElement) => <BridgeLayout>{page}</BridgeLayout>
