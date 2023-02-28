import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

export const FailureNetwork: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          opacity='0.5'
          d='M20 18.5L16.5 15.5M19.5 5L16 8M4 4L8 8M5.5 18.5L8 15.5'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M17.25 12C17.25 14.8995 14.8995 17.25 12 17.25C9.1005 17.25 6.75 14.8995 6.75 12C6.75 9.10051 9.10051 6.75 12 6.75C14.8995 6.75 17.25 9.1005 17.25 12Z'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M23.25 3C23.25 4.24264 22.2426 5.25 21 5.25C19.7574 5.25 18.75 4.24264 18.75 3C18.75 1.75736 19.7574 0.75 21 0.75C22.2426 0.75 23.25 1.75736 23.25 3Z'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M6.25 20.5C6.25 22.0188 5.01878 23.25 3.5 23.25C1.98122 23.25 0.75 22.0188 0.75 20.5C0.75 18.9812 1.98122 17.75 3.5 17.75C5.01878 17.75 6.25 18.9812 6.25 20.5Z'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M23.25 19.5C23.25 20.4665 22.4665 21.25 21.5 21.25C20.5335 21.25 19.75 20.4665 19.75 19.5C19.75 18.5335 20.5335 17.75 21.5 17.75C22.4665 17.75 23.25 18.5335 23.25 19.5Z'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M4.25 2.5C4.25 3.4665 3.4665 4.25 2.5 4.25C1.5335 4.25 0.75 3.4665 0.75 2.5C0.75 1.5335 1.5335 0.75 2.5 0.75C3.4665 0.75 4.25 1.5335 4.25 2.5Z'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    </Svg>
  )
}
