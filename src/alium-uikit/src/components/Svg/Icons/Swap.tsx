import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M10.0093 12.0001L10.0093 14.8958L2.4082 9.25338L10.0093 3.611L10.0093 6.50667L18.3344 6.50667'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        opacity='0.5'
        d='M10.0093 12.0001L13.9908 12.0002L13.9908 9.10454L21.5919 14.7469L13.9908 20.3893L13.9908 17.4936L5.66577 17.4936'
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
