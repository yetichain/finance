import { Children, cloneElement, FC, ReactElement } from 'react'
import { sizes, variants } from '../Button/types'
import StyledButtonMenu from './StyledButtonMenu'
import { ButtonMenuItemProps, ButtonMenuProps } from './types'

const ButtonMenu: FC<ButtonMenuProps> = ({
  activeIndex = 0,
  size = sizes.MD,
  variant = variants.PRIMARY,
  onClick,
  children,
  className,
}) => {
  return (
    <StyledButtonMenu variant={variant} className={className}>
      {Children.map(children, (child: ReactElement<ButtonMenuItemProps>, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onClick ? () => onClick(index) : undefined,
          size,
          variant,
        })
      })}
    </StyledButtonMenu>
  )
}

export default ButtonMenu
