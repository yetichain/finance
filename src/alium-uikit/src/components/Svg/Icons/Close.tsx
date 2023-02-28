import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <path
        d='M7.75781 16.4623L16.2431 7.97705M7.75781 7.97705L16.2431 16.4623'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </Svg>
  )
}

export default Icon
