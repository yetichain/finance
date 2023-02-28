import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' color='#8990A5' style={{ fill: 'none' }} {...props}>
      <circle
        cx='7'
        cy='15.6621'
        r='4'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11 17.6621L17 17.6621'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20 15.4196L20 12.5691C17.9439 11.8591 16.4558 11.763 14 12.5691L14 17'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        opacity='0.5'
        d='M17.0004 11.6616L17.0004 7.84082L18.3525 7.84082'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        opacity='0.5'
        d='M13.2161 4.9552C12.7505 4.78611 12.3031 4.63776 11.8669 4.51155M5 11.5333L5 4.9552C8.36348 3.79422 9.22924 3.74822 11.8669 4.51155M11.8669 4.51155L14 12'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle
        cx='19'
        cy='17.6621'
        r='2'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export default Icon
