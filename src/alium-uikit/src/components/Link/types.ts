import { LinkProps as NextLinkProps } from 'next/link'
import { CSSProperties } from 'react'
import { TextProps } from '../Text'

export interface LinkProps extends TextProps, NextLinkProps {
  external?: boolean
  as?: 'a' | 'button'
  style?: CSSProperties
  id?: string
}
