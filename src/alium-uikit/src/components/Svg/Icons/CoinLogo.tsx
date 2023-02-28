import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 18 18' fill='none' {...props}>
     <image width='18' height='18' href='/images/favicon-32x32.png' />
    </Svg>
  )
}

export default Icon
