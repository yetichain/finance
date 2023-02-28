import styled, { DefaultTheme } from 'styled-components'
import { space } from 'styled-system'
import { ButtonProps, ButtonThemeVariant, variants } from './types'

type ThemedProps = {
  theme: DefaultTheme
} & ButtonProps

const getDisabledStyles = ({ isloading, theme }: ThemedProps) => {
  if (isloading === true) {
    return `
      &:disabled,
      &.button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `
}

const removePointerEvents = ({ disabled, as }: ThemedProps) => {
  if (disabled && as && as !== 'button') {
    return `
      pointer-events: none;
    `
  }

  return ''
}

const getButtonVariantProp =
  (prop: keyof ButtonThemeVariant) =>
  ({ theme, variant = variants.PRIMARY }: ThemedProps) => {
    return theme.button[variant][prop]
  }

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${getButtonVariantProp('background')};
  border: ${getButtonVariantProp('border')};
  border-radius: 6px;
  color: ${getButtonVariantProp('color')};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  /* max-content instead of auto for Safari fix */
  width: ${({ fullwidth }) => (fullwidth ? '100%' : 'max-content')};
  height: ${({ size }) => (size === 'sm' ? '32px' : '48px')};
  line-height: 1;
  letter-spacing: 0.03em;
  justify-content: center;
  outline: 0;
  padding: ${({ size }) => (size === 'sm' ? '0 16px' : '0 24px')};
  transition: background-color 0.2s;
  opacity: ${({ isloading }) => (isloading ? 0.5 : 1)};

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background-color: ${getButtonVariantProp('backgroundHover')};
    border-color: ${getButtonVariantProp('borderColorHover')};
  }
  &:hover {
    &,
    & > div,
    & p,
    & span {
      color: ${getButtonVariantProp('colorHover')};
    }
    & svg {
      fill: ${getButtonVariantProp('colorHover')};
    }
  }

  &:focus:not(:active) {
    color: ${getButtonVariantProp('colorPressed')};
    // box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }

  &:active {
    background-color: ${getButtonVariantProp('backgroundActive')};
    box-shadow: inset 0 3px 0 ${getButtonVariantProp('boxShadow')};
  }

  ${({ buttonType }) =>
    buttonType === 'close' &&
    `
    border: 1px solid #D2D6E5;
    box-sizing: border-box;
    border-radius: 6px;
    background: none;
    box-shadow: none;
    :hover {
      background-color: #D2D6E5 !important;
       border: 1px solid #D2D6E5 !important;
    }
  `}

  ${({ buttonType }) =>
    buttonType === 'max' &&
    `
   display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 7px 8px;
    width: 40px;
    height: 24px;
    background: #E6E6F6;
    border-radius: 6px;
    font-size: 10px;
    box-shadow: none;
    color: #6C5DD3;
    
    :hover {
      background: #CBC8EE !important;
    }
    :focus {
      box-shadow: inset 0px 2px 0px #A29ED5;
      background: #CBC8EE !important;
    }
  `}

  ${getDisabledStyles}
  ${removePointerEvents}
  ${space}
`

StyledButton.defaultProps = {
  fullwidth: false,
  type: 'button',
}

export default StyledButton
