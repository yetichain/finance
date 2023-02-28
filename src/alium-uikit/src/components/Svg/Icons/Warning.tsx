import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M13.72 5.1467L2.42669 24C2.19385 24.4033 2.07065 24.8604 2.06935 25.3261C2.06804 25.7917 2.18868 26.2495 2.41926 26.6541C2.64984 27.0586 2.98233 27.3957 3.38364 27.6318C3.78495 27.868 4.24109 27.9949 4.70669 28H27.2934C27.759 27.9949 28.2151 27.868 28.6164 27.6318C29.0177 27.3957 29.3502 27.0586 29.5808 26.6541C29.8114 26.2495 29.932 25.7917 29.9307 25.3261C29.9294 24.8604 29.8062 24.4033 29.5734 24L18.28 5.1467C18.0423 4.75484 17.7077 4.43085 17.3083 4.20601C16.9089 3.98116 16.4583 3.86304 16 3.86304C15.5417 3.86304 15.0911 3.98116 14.6918 4.20601C14.2924 4.43085 13.9577 4.75484 13.72 5.1467V5.1467Z'
        stroke='#FFA100'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M16 12V17.3333' stroke='#FFA100' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16 22.6667H16.0133' stroke='#FFA100' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </Svg>
  )
}

export default Icon
