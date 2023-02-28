import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.08763 7.53915L5.2002 5.6521V12.0942C5.2002 13.7432 5.82934 15.3919 7.08763 16.6497C9.60459 19.1656 13.6852 19.1656 16.2022 16.6497L7.08763 7.53915Z'
        stroke='black'
        strokeWidth='2'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.0803 16.3974L17.9677 18.2841V11.8419C17.9677 10.1933 17.3386 8.54464 16.0803 7.28686C13.5633 4.77092 9.48268 4.77092 6.96573 7.28686L16.0803 16.3974Z'
        stroke='black'
        strokeWidth='2'
      />
    </Svg>
  )
}

export default Icon
