import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 6 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M4.98462 10.2803L1.23462 6.53032C0.941725 6.23743 0.941725 5.76256 1.23462 5.46966L4.98462 1.71967'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
