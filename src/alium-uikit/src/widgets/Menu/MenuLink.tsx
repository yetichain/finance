import Link from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'

const MenuLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...otherProps }) => {
  return <Link href={href} {...otherProps} />
}

export default MenuLink
