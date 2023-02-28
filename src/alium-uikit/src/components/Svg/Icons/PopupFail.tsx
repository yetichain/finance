import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 40 40' fill='none' {...props}>
      <rect x='1' y='1' width='38' height='38' rx='11' fill='#FF4D00' fillOpacity='0.1' />
      <path
        d='M15.7578 24.2427L24.2431 15.7574M15.7578 15.7574L24.2431 24.2427'
        stroke='#FF4D00'
        strokeWidth='2'
        strokeLinecap='round'
        fill='none'
      />
      <rect x='1' y='1' width='38' height='38' rx='11' stroke='#FF4D00' strokeWidth='2' fill='none' />
    </Svg>
  )
}

export default Icon
