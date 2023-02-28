import styled, { DefaultTheme } from 'styled-components'
import { Variants, variants } from '../Button/types'

interface StyledButtonMenuProps {
  variant: Variants
  theme: DefaultTheme
}

const getBackgroundColor = ({ theme, variant }: StyledButtonMenuProps) => {
  return theme.colors[variant === variants.SUBTLE ? 'input' : 'tertiary']
}

const StyledButtonMenu = styled.div<{ variant: Variants }>`
  background: #f4f5fa;
  padding: 10px;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  display: inline-flex;

  & > button + button,
  & > a + a {
    letter-spacing: 0;
    margin-left: 8px; // To avoid focus shadow overlap
  }
`

export default StyledButtonMenu
