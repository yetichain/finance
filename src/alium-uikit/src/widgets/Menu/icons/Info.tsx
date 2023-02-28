import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        d='M3 3V18C3 19.6569 4.34315 21 6 21H21'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M6.24365 21L6.24365 10.25C6.24365 9.55964 6.8033 9 7.49365 9V9C8.18401 9 8.74365 9.55964 8.74365 10.25L8.74365 21'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M11.7437 21L11.7437 13.25C11.7437 12.5596 12.3033 12 12.9937 12V12C13.684 12 14.2437 12.5596 14.2437 13.25L14.2437 21'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
      <path
        opacity='0.5'
        d='M17.2437 21L17.2437 15.25C17.2437 14.5596 17.8033 14 18.4937 14V14C19.184 14 19.7437 14.5596 19.7437 15.25L19.7437 21'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
