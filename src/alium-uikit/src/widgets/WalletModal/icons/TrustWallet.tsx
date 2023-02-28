import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M12.3689 1.5C15.8571 4.46101 19.8573 4.2784 21 4.2784C20.7502 21.1175 18.8452 17.7782 12.3689 22.5C5.89284 17.7782 3.99998 21.1175 3.75 4.2784C4.88093 4.2784 8.88093 4.46101 12.3689 1.5Z'
        stroke='#3375BB'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
