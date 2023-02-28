import { FC } from 'react'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <svg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12.3283 0.975891L5.0302 8.27397L1.71289 4.95666'
        stroke='#1EA76D'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Icon
