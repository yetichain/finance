import { Button, Flex } from 'alium-uikit/src'
import { NextLink } from 'components/NextLink'
import { AlmTokenStatsIcon } from 'images/account/AlmTokenStatsIcon'
import { MyCollectionIcon } from 'images/account/MyCollectionIcon'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

function NftNavTabs() {
  const { t } = useTranslation()
  const location = useRouter()

  return (
    <NavWrap>
      <NextLink href={ROUTES.tokenHolderArea}>
        <NftButton fullwidth variant={location.pathname === ROUTES.tokenHolderArea ? 'primary' : 'tertiary'}>
          <IconWrapper active={location.pathname === ROUTES.tokenHolderArea} size={16}>
            <AlmTokenStatsIcon />
          </IconWrapper>
          {t('YET token stats')}
        </NftButton>
      </NextLink>
      <NextLink href={ROUTES.collection}>
        <NftButton fullwidth variant={location.pathname === ROUTES.collection ? 'primary' : 'tertiary'}>
          <IconWrapper active={location.pathname === ROUTES.collection} size={16}>
            <MyCollectionIcon />
          </IconWrapper>
          {t('My collection')}
        </NftButton>
      </NextLink>
    </NavWrap>
  )
}

export default NftNavTabs

// styles

const NavWrap = styled(Flex)`
  max-width: 482px;
  margin-top: 56px;
  padding: 8px;
  border: 1px solid #d2d6e5;
  border-radius: 6px;

  & > a {
    flex: 1;

    &:first-child {
      margin-right: 8px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    max-width: 100%;

    & > a:first-child {
      min-width: 175px;
    }
  }
`

const NftButton = styled(Button)`
  @media (max-width: 568px) {
    padding: 0 16px;
  }
`

const IconWrapper = styled.div<{ size?: number; active: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  & > img,
  span {
    height: ${({ size }) => (size ? `${size}px` : '32px')};
    width: ${({ size }) => (size ? `${size}px` : '32px')};
  }

  svg {
    path {
      stroke: ${({ active }) => (active ? '#FFF' : '#6C5DD3')};
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-end;
  }
`
