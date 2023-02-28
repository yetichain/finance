import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 48 48' fill='none' {...props}>
      <rect x='1' y='1' width='46' height='46' rx='11' fill='#1EA76D' fillOpacity='0.1' />
      <path
        d='M33.4362 16.8462L20.4619 29.8205L14.5645 23.9231'
        stroke='#1EA76D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <rect x='1' y='1' width='46' height='46' rx='11' stroke='#1EA76D' strokeWidth='2' fill='none' />
    </Svg>
  )
}

export default Icon
