import NextLink from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import Text from '../Text/Text'
import { LinkProps } from './types'

const StyledLink = styled(Text)<LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  transition: color 200ms ease-in-out;
  &:hover {
    color: #6c5dd3;
  }
  svg > * {
    transition: stroke 200ms ease-in-out;
  }
  &:hover > svg:last-child > * {
    stroke: #6c5dd3;
  }
`

const Link: FC<LinkProps> = ({ external, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  return (
    <NextLink href={props?.href || '/'}>
      <StyledLink as='a' {...internalProps} {...props} />
    </NextLink>
  )
}

Link.defaultProps = {
  color: 'primary',
}

export default Link
