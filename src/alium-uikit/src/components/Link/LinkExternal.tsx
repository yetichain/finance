import { FC } from 'react'
import OpenNewIcon from '../Svg/Icons/OpenNew'
import Link from './Link'
import { LinkProps } from './types'

const LinkExternal: FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon color='primary' ml='8px' paddingBottom='2px' />
    </Link>
  )
}

export default LinkExternal
