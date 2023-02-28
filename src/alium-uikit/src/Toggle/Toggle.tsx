import { FC } from 'react'
import StyledToggle, { Handle, Input } from './StyledToggle'
import { scales, ToggleProps } from './types'

const Toggle: FC<ToggleProps> = ({ checked, scale = scales.MD, ...props }) => {
  const isChecked = !!checked

  return (
    <StyledToggle checked={isChecked} scale={scale}>
      <Input checked={checked} scale={scale} {...props} type='checkbox' />
      <Handle scale={scale} />
    </StyledToggle>
  )
}

Toggle.defaultProps = {
  scale: scales.MD,
}

export default Toggle
