import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 17 16' fill='none' {...props}>
      <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0)'>
          <path
            d='M13.5413 4.51245L1.51465 10.0281L3.21972 11.7569L15.5146 6.2201V5.37338L13.5413 4.51245Z'
            fill='#8990A5'
          />
          <path d='M13.3483 13.588L15.515 12.5068L10.9513 10.0294L8.65234 11.1252L13.3483 13.588Z' fill='#8990A5' />
          <path d='M13.3477 11.125V8.96757L15.5143 7.97974V12.5065L13.3477 13.5878V11.125Z' fill='#8990A5' />
          <path
            d='M8.51488 16.0002L12.1362 14.193L9.7776 12.9072L8.51488 13.5374L7.51695 13.0394L4.89355 14.193L8.51488 16.0002Z'
            fill='#8990A5'
          />
          <path d='M1.51465 12.5068L3.32721 13.4113L5.89993 12.2324L1.51465 10.0281V12.5068Z' fill='#8990A5' />
          <path d='M1.51465 3.49316V8.17011L3.68131 7.1446V4.87472V4.43949L1.51465 3.49316Z' fill='#8990A5' />
          <path
            d='M15.5146 3.49342V5.95277L11.1878 3.79612L11.187 3.79656L9.73047 3.06971L11.1878 3.79612L13.6156 2.54575L15.5146 3.49342Z'
            fill='#8990A5'
          />
          <path
            d='M8.51488 0L4.92871 1.78963L7.29905 3.06955L8.51488 2.4628L9.7307 3.06955L12.101 1.78963L8.51488 0Z'
            fill='#8990A5'
          />
          <path d='M3.65811 2.42358L1.51465 3.49325L6.11215 6.07766L8.51464 5.01912L3.65811 2.42358Z' fill='#8990A5' />
        </g>
        <defs>
          <clipPath id='clip0'>
            <rect width='16' height='16' fill='white' transform='translate(0.514648)' />
          </clipPath>
        </defs>
      </svg>
    </Svg>
  )
}

export default Icon
