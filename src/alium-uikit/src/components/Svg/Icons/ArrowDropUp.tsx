import { FC } from 'react'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M1.29297 6.64641L6.29297 1.64641C6.68349 1.25588 7.31666 1.25588 7.70718 1.64641L12.7072 6.64641'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  )
}

export default Icon
