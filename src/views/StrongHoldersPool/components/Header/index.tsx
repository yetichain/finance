import { Button } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'

export default function Header() {
  const { t } = useTranslation()
  const router = useRouter()
  const tabs = useMemo(
    () => [
      {
        title: t('New Pool'),
        href: ROUTES.shp,
      },
      {
        title: t('Your Pools'),
        href: ROUTES.shpYour,
      },
    ],
    [t],
  )
  return (
    <Header.Root>
      <Header.Main>
        <Header.Title>{t('Strong Holders Pool')}</Header.Title>
        <Header.Tabs>
          {tabs.map((t) => (
            <Link href={t.href} key={t.href} passHref>
              <Header.Tab forwardedAs='a' variant={t.href === router.pathname ? 'primary' : 'tertiary'}>
                {t.title}
              </Header.Tab>
            </Link>
          ))}
        </Header.Tabs>
      </Header.Main>
      <Header.ImageContainer>
        <img src='/images/shp/header-bg.svg' />
      </Header.ImageContainer>
    </Header.Root>
  )
}

Header.Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

Header.ImageContainer = styled.div`
  max-height: 200px;
  z-index: -1;

  img {
    object-fit: contain;
  }
`

Header.Title = styled.h2`
  ${typography.h2}
  color: #0b1359;
  margin-bottom: 32px;
`

Header.Tabs = styled.div`
  background: #f4f5fa;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  padding: 8px;
  display: flex;

  & > * + * {
    margin-left: 8px;
  }
`

Header.Tab = styled(Button)`
  min-width: 164px;
  width: auto;
  height: 40px;
`

Header.Root = styled.div`
  display: flex;
  align-items: center;

  @media ${mq.down(breakpoints.lg)} {
    ${Header.Title} {
      ${typography.h3}
    }

    ${Header.ImageContainer} {
      max-width: 350px;

      img {
        max-height: 100%;
      }
    }
  }

  @media ${mq.down(breakpoints.md)} {
    ${Header.Title} {
      ${typography.h5}
      margin-bottom: 24px;
    }

    ${Header.ImageContainer} {
      max-height: 150px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${Header.Tab} {
      min-width: auto;
      flex: 1;
    }

    ${Header.ImageContainer} {
      display: none;
    }

    ${Header.Main} {
      align-items: stretch;
    }
  }
`
