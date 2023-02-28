import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M5.5 5.09628L8.50003 3M8.50004 21L8.50003 3M8.50003 3L11.5 5.09628'
        stroke='#6C5DD3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        opacity='0.5'
        d='M12.5 18.9037L15.5 21M15.5 3L15.5 21M15.5 21L18.5 18.9037'
        stroke='#6C5DD3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export default Icon
