import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import Overlay from '../../components/Overlay/Overlay'
import { BurgerIcon, CloseIcon } from '../../components/Svg'
import LogoD from './assets/LogoD.svg'
import LogoM from './assets/LogoM.svg'
import { MENU_HEIGHT, SIDEBAR_WIDTH_FULL, SIDEBAR_WIDTH_REDUCED } from './config'
import { MenuButton2 } from './MenuButton2'
import Panel from './Panel'
import { NavProps } from './types'
import UserBlock from './UserBlock'
import ViewAlmPrice from './ViewAlmPrice'

const Menu: FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  links,
  loginBlockVisible = true,
  buttonTitle = 'Connect',
  children,
  explorerName,
  explorerLink,
  onTransactionHistoryHandler,
}) => {
  const [ispushed, setIsPushed] = useState(false)
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    let scrollPrev = 0

    const handleHeaderToggleOnScroll = () => {
      const scrolled = window.scrollY

      if (scrolled > 128 && scrolled >= scrollPrev - 64) {
        setShowNav(false)
        setIsPushed(false)
      } else {
        setShowNav(true)
      }
      scrollPrev = scrolled
    }

    document.addEventListener('scroll', handleHeaderToggleOnScroll)

    return () => {
      document.removeEventListener('scroll', handleHeaderToggleOnScroll)
    }
  }, [])

  return (
    <SWrapper>
      <SNav showNav={showNav} ispushed={ispushed}>
        <SLeftPartNav>
          <SLogoD>
            <img src={LogoD} alt='Site logo' />
          </SLogoD>
          <SLogoM>
            <img src={LogoM} alt='Site logo' />
          </SLogoM>
          <ViewAlmPrice ispushed={ispushed} />
        </SLeftPartNav>
        <SRightPartNav>
          <UserBlock
            login={login}
            logout={logout}
            account={account}
            buttonTitle={buttonTitle}
            explorerName={explorerName}
            explorerLink={explorerLink}
            loginBlockVisible={loginBlockVisible}
            onTransactionHistoryHandler={onTransactionHistoryHandler}
          />
          <MenuButton2 aria-label='Toggle menu' onClick={() => setIsPushed((prevState: boolean) => !prevState)}>
            {ispushed ? <CloseIcon color='primary' width='24' height='25' /> : <BurgerIcon width='24' height='24' />}
          </MenuButton2>
        </SRightPartNav>
      </SNav>
      <Panel
        ispushed={ispushed}
        showNav={showNav}
        isDark={isDark}
        toggleTheme={toggleTheme}
        pushNav={setIsPushed}
        links={links}
        togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
      />
      <SInner ispushed={ispushed}>{children}</SInner>
      <SMobileOnlyOverlay show={ispushed} onClick={() => setIsPushed(false)} role='presentation' />
    </SWrapper>
  )
}

export default Menu

// styles

const SWrapper = styled.div`
  position: relative;
  width: 100%;
`

// Шапка

const SNav = styled.nav<{ showNav: boolean; ispushed: boolean }>`
  position: fixed;
  top: ${({ showNav }) => (showNav ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  align-items: center;
  padding-right: 33px;
  padding-left: 29px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
  background-color: #f4f5fa;

  @media ${mq.up(breakpoints.md)} {
    left: ${({ ispushed }) => `${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ ispushed }) => `calc(100% - ${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }

  @media ${mq.down(breakpoints.lg)} {
    padding-right: 24px;
    padding-left: 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    padding-right: 10px;
    padding-left: 11px;
  }
`

const SLeftPartNav = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`

const SLogoD = styled.div`
  display: none;

  @media ${mq.down(breakpoints.md)} {
    display: initial;
  }

  @media ${mq.down(breakpoints.sm)} {
    display: none;
  }
`

const SLogoM = styled.div`
  display: none;

  @media ${mq.down(breakpoints.sm)} {
    display: initial;
  }
`

const SRightPartNav = styled.div`
  display: flex;
  align-items: center;
`

// Тело страницы

const SInner = styled.div<{ ispushed: boolean }>`
  flex-grow: 1;
  margin-top: ${MENU_HEIGHT}px;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  @media ${mq.up(breakpoints.md)} {
    margin-left: ${({ ispushed }) => `${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ ispushed }) => `calc(100% - ${ispushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`

// Оверлей

const SMobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;
  display: none;

  @media ${mq.up(breakpoints.md)} {
    display: none;
  }
`
