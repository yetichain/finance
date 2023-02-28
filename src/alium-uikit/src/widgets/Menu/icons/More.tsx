import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='20' height='6' viewBox='0 0 20 6' {...props}>
      <rect
        x='0.764648'
        y='1.24756'
        width='3.5'
        height='3.5'
        rx='1.25'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <rect
        x='7.76465'
        y='1.24756'
        width='3.5'
        height='3.5'
        rx='1.25'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <rect
        opacity='0.5'
        x='14.7646'
        y='1.24756'
        width='3.5'
        height='3.5'
        rx='1.25'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
