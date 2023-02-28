import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='19' height='21' viewBox='0 0 21 20' color='#8990A5' fill='none' {...props}>
      <path
        d='M8.52398 9.9974L8.52398 12.8931L0.922851 7.25069L8.52398 1.60832L8.52398 4.50399L16.849 4.50398'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        opacity='0.5'
        d='M8.52416 9.99757L12.5057 9.99764L12.5057 7.10198L20.1068 12.7443L12.5057 18.3867L12.5057 15.4911L4.18066 15.4911'
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
