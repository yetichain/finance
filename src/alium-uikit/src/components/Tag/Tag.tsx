import { cloneElement, FC, isValidElement } from 'react'
import { StyledTag } from './StyledTag'
import { TagProps } from './types'

const Tag: FC<TagProps> = ({ startIcon, endIcon, children, ...props }) => (
  <StyledTag {...props}>
    {isValidElement(startIcon) &&
      cloneElement(startIcon, {
        mr: '0.5rem',
      })}
    {children}
    {isValidElement(endIcon) &&
      cloneElement(endIcon, {
        ml: '0.5rem',
      })}
  </StyledTag>
)

Tag.defaultProps = {
  variant: 'primary',
  outline: false,
}

export default Tag
