import { ButtonMenu, ButtonMenuItem, Flex, Heading } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'
import { ROUTES } from 'routes'
import styled from 'styled-components'

interface props {
  activeIndex?: number
}

export const CardNav: FC<props> = ({ activeIndex = 0 }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const routes = useMemo(
    () => [
      { href: ROUTES.exchange, title: t('Exchange') },
      { href: ROUTES.pool, title: t('Liquidity') },
      { href: ROUTES.migrate, title: t('Migrate') },
    ],
    [t],
  )

  return (
    <Flex alignItems='center' p='12px'>
      <StyledNav>
        <Heading as='h1' size='xl' color='heading' mb='40px' mt='20px'>
          {t('Trade')}
        </Heading>
        <ButtonMenuStyled size='md' variant='primary' activeIndex={activeIndex}>
          {routes.map(({ href, title }) => (
            <Link key={href} href={href} passHref>
              <ButtonMenuItem isActive={router.pathname.startsWith(href)}>{title}</ButtonMenuItem>
            </Link>
          ))}
        </ButtonMenuStyled>
      </StyledNav>
    </Flex>
  )
}

// styles

const ButtonMenuStyled = styled(ButtonMenu)`
  & a {
    width: 140px;
    text-align: center;
    @media screen and (max-width: 480px) {
      width: 106px;
    }
  }
`

const StyledNav = styled.div`
  margin-bottom: 32px;

  & > h1 {
    margin-bottom: 16px;
    margin-top: 0;
    font-size: 48px;
  }

  & > div {
    padding: 8px;
  }

  @media screen and (max-width: 768px) {
    & > h1 {
      font-size: 32px;
      margin-top: 0;
    }
  }

  @media screen and (max-width: 376px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;

    & > h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    & > div {
      align-self: center;
    }
  }
`
