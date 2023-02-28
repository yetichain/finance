import BtnLoader from 'components/Loaders/BtnLoader'
import { NextLink } from 'components/NextLink'
import { cloneElement, FC, isValidElement } from 'react'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import StyledButton from './StyledButton'
import { ButtonProps, sizes, variants } from './types'

const LinkWrapped: FC<{ as: ButtonProps['as']; href?: string; id?: string; target?: string }> = ({
  as,
  href,
  children,
}) => {
  if (as === 'a') {
    return <NextLink.Multiple href={href}>{children}</NextLink.Multiple>
  }
  return <>{children}</>
}

const Button: FC<ButtonProps> = ({ startIcon, endIcon, children, external, as, isloading, disabled, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isloading || disabled

  return (
    <StyledButton {...internalProps} {...props} isloading={isloading} disabled={isDisabled} as={as || null}>
      {isloading ? (
        <BtnLoader />
      ) : (
        <LinkWrapped as={as} href={props.href} target={props?.target || ''}>
          {isValidElement(startIcon) &&
            cloneElement(startIcon, {
              mr: '0.5rem',
            })}
          {children}
          {isValidElement(endIcon) &&
            cloneElement(endIcon, {
              ml: '0.5rem',
            })}
        </LinkWrapped>
      )}
    </StyledButton>
  )
}

Button.defaultProps = {
  variant: variants.PRIMARY,
  size: sizes.MD,
  external: false,
  isloading: false,
  disabled: false,
}

export default Button
