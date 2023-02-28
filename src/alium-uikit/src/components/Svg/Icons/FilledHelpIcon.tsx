import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <circle cx='12' cy='12' r='12' fill='#EBEDF9' />
      <path
        d='M9.08496 8.50228C9.32006 7.83395 9.78411 7.27039 10.3949 6.91141C11.0057 6.55244 11.7239 6.42122 12.4221 6.54099C13.1204 6.66076 13.7538 7.0238 14.21 7.56581C14.6663 8.10781 14.916 8.7938 14.915 9.50228C14.915 11.5023 11.915 12.5023 11.915 12.5023V13.9978'
        stroke='#92929D'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        d='M11.9951 17.5022H12.0051'
        stroke='#92929D'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
