import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M9 17.9037L12 20M12 4L12 20M12 20L15 17.9037'
        stroke='#6C5DD3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
