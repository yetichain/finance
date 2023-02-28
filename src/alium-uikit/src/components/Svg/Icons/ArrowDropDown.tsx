import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 13 8' width='13' height='8' fill='none' {...props}>
      <path
        d='M12.2218 1.35108L7.22183 6.35108C6.83131 6.7416 6.19814 6.7416 5.80762 6.35107L0.807617 1.35107'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
