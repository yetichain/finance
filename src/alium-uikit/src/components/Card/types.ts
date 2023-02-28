import { HTMLAttributes, ReactNode } from 'react'
import { SpaceProps } from 'styled-system'
import { Colors } from '../../theme/types'

export interface CardRibbonProps {
  variantColor?: keyof Colors
  text: string
}

export interface CardTheme {
  background: string
  boxShadow: string
  boxShadowActive: string
  boxShadowSuccess: string
  boxShadowWarning: string
  cardHeaderBackground: string
}

export interface CardProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  isSuccess?: boolean
  isWarning?: boolean
  isDisabled?: boolean
  ribbon?: ReactNode
}
