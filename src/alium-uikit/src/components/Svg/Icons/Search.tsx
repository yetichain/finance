import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M18.2495 11C18.2495 15.0041 15.0036 18.25 10.9995 18.25C6.99545 18.25 3.74951 15.0041 3.74951 11C3.74951 6.99594 6.99545 3.75 10.9995 3.75C15.0036 3.75 18.2495 6.99594 18.2495 11Z'
        stroke='#6C5DD3'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path d='M20.9994 20.9999L16.6494 16.6499' stroke='#6C5DD3' strokeWidth='1.5' strokeLinecap='round' fill='none' />
    </Svg>
  )
}

export default Icon
