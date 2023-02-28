import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import Button from '../../components/Button/Button'

interface MenuButtonProps {
  mobile?: boolean
}

const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
  -webkit-tap-highlight-color: transparent;
  display: ${(props: MenuButtonProps) => (props.mobile ? '' : 'none')};

  @media ${mq.up(breakpoints.md)} {
    display: ${(props: MenuButtonProps) => (props.mobile ? 'none' : 'block')};
  }

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background: none;
  }
`
MenuButton.defaultProps = {
  variant: 'text',
  size: 'sm',
}

export default MenuButton
