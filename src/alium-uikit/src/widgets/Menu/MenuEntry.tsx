import styled, { css, DefaultTheme, keyframes } from 'styled-components'

export interface Props {
  secondary?: boolean
  isActive?: boolean
  theme: DefaultTheme
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`

const LinkLabel = styled.div<{ ispushed: boolean }>`
  color: ${({ ispushed, theme }) => (ispushed ? theme.colors.textSubtle : 'transparent !important')};
  transition: color 0.4s;
  flex-grow: 1;
  font-size: 14px;
  display: flex;
`

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: auto;
  padding: ${({ secondary }) => (secondary ? '0 30px' : '0 14px')};
  font-size: ${({ secondary }) => (secondary ? '14px' : '16px')};
  padding-top: 18px;
  padding-bottom: 14px;

  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.1px;

  color: ${({ theme, isActive }) => (isActive ? '#24BA7B' : theme.colors.textSubtle)};
  transition: color 200ms ease-in-out;

  a {
    color: ${({ isActive }) => (isActive ? '#24BA7B' : '#8990a5')} !important;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
  }

  a > div {
    margin-left: 8px;
  }
  a > span {
    margin-left: 8px;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      svg {
        color: inherit;
      }
    `}

  svg * {
    transition: all 200ms ease-in-out;
  }

  &:hover div {
    color: #24ba7b;
  }

  & a {
    transition: color 200ms ease-in-out;
    div {
      color: ${({ theme, isActive }) => (isActive ? '#24BA7B' : theme.colors.textSubtle)};
    }
  }

  &:hover a {
    color: #24ba7b !important;
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    -webkit-background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 200% 100%;
    font-weight: bold;
  }
`
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: 'button',
}

export { MenuEntry, LinkLabel }
