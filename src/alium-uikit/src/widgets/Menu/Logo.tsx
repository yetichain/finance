import { NextLink } from 'components/NextLink'
import { FC } from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import Flex from '../../components/Flex/Flex'
import { LogoIcon } from '../../components/Svg'
import { LogoIcon as LogoWithText } from './icons'

interface Props {
  isDark: boolean
  href: string
  ispushed?: boolean
}

const StyledLink = styled(NextLink)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;

    @media ${mq.up(breakpoints.md)} {
      display: none;
    }
  }
  .desktop-icon {
    width: 144px;
    height: auto;
    display: none;

    @media ${mq.up(breakpoints.md)} {
      display: block;
    }
  }
`

const Logo: FC<Props> = ({ isDark, href, ispushed }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <NextLink.Multiple href='/'>
      <LogoIcon className='mobile-icon' />
      {!ispushed ? (
        <LogoWithText className='desktop-icon' isDark={isDark} />
      ) : (
        <LogoWithText className='desktop-icon' isDark={isDark} withText />
      )}
    </NextLink.Multiple>
  )

  return (
    <Flex>
      {isAbsoluteUrl ? (
        <StyledLink as='a' href={href} aria-label='YETI home page'>
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink href={href} aria-label='YETI home page'>
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default Logo
