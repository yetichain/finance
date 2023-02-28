import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 16 16' fill='none' {...props}>
      <g clipPath='url(#clip0)'>
        <path
          d='M14.7233 3.15541L16 1.93408V1.66675H11.5773L8.42533 9.51208L4.83933 1.66675H0.202V1.93408L1.69333 3.72941C1.83867 3.86208 1.91467 4.05608 1.89533 4.25141V11.3067C1.94133 11.5607 1.85867 11.8221 1.68 12.0067L0 14.0427V14.3067H4.76333V14.0394L3.08333 12.0067C2.90133 11.8214 2.81533 11.5647 2.852 11.3067V5.20408L7.03333 14.3101H7.51933L11.1147 5.20408V12.4581C11.1147 12.6494 11.1147 12.6887 10.9893 12.8141L9.696 14.0654V14.3334H15.9707V14.0661L14.724 12.8454C14.6147 12.7627 14.558 12.6241 14.5813 12.4894V3.51141C14.558 3.37608 14.614 3.23741 14.7233 3.15541Z'
          fill='#8990A5'
        />
      </g>
      <defs>
        <clipPath id='clip0'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </Svg>
  )
}

export default Icon
