import React, { FC } from 'react'
import styled from 'styled-components'

const Shadow = styled.div<{ hide: boolean }>`
  ${(props) => props.hide && 'display: none;'}
`
interface Props {
  hide: boolean
  children: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Use when the component needs to be hidden or when there are problems with rendering children
 */
export const ShadowComponent: FC<Props> = ({ hide, children, style }) => {
  return (
    <Shadow hide={hide} className='shadow__component' style={style || {}}>
      {children}
    </Shadow>
  )
}
