import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M10 8L6 12L10 16'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        d='M6 12L16.3291 12'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
