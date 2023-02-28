import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='19' height='21' viewBox='0 0 19 21' color='#8990A5' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        opacity='0.5'
        d='M12.4485 18.9974C12.4485 19.4116 12.7843 19.7474 13.1985 19.7474H5.83008C6.24429 19.7474 6.58009 19.4116 6.58009 18.9974V12.7861H12.4485V18.9974Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.1111 2.44947C10.6601 1.05721 8.36931 1.05721 6.91834 2.44947L2.2919 6.88881C1.95133 7.2156 1.72225 7.64129 1.63712 8.10556C1.05259 11.2932 1.00944 14.5566 1.50949 17.7585L1.69025 18.916C1.765 19.3947 2.17729 19.7476 2.66177 19.7476H6.8305H12.1989H16.3676C16.8521 19.7476 17.2644 19.3947 17.3392 18.916L17.5199 17.7585C18.02 14.5566 17.9768 11.2932 17.3923 8.10556C17.3072 7.64129 17.0781 7.2156 16.7375 6.88881L12.1111 2.44947Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
