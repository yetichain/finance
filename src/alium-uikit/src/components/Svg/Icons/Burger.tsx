import { FC } from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props} fill='none'>
      <path
        opacity='0.5'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.75 12.0024C19.75 11.5882 19.4142 11.2524 19 11.2524H5C4.58579 11.2524 4.25 11.5882 4.25 12.0024C4.25 12.4166 4.58579 12.7524 5 12.7524H19C19.4142 12.7524 19.75 12.4166 19.75 12.0024Z'
        fill='#8990A5'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.75 7.00244C19.75 6.58823 19.4142 6.25244 19 6.25244H5C4.58579 6.25244 4.25 6.58823 4.25 7.00244C4.25 7.41665 4.58579 7.75244 5 7.75244H19C19.4142 7.75244 19.75 7.41665 19.75 7.00244Z'
        fill='#8990A5'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.75 17.0024C19.75 16.5882 19.4142 16.2524 19 16.2524H5C4.58579 16.2524 4.25 16.5882 4.25 17.0024C4.25 17.4166 4.58579 17.7524 5 17.7524H19C19.4142 17.7524 19.75 17.4166 19.75 17.0024Z'
        fill='#8990A5'
      />
    </Svg>
  )
}

export default Icon
