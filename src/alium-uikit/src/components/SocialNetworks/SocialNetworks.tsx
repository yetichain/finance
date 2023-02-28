import { FC } from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { externalLinks } from '../../config'
import { ReactComponent as BscscanIcon } from './assets/Bscscan.svg'
import { ReactComponent as CoingeckoIcon } from './assets/Coingecko.svg'
import { ReactComponent as CoinMarketCapIcon } from './assets/CoinMarketCap.svg'
import { ReactComponent as DextoolsIcon } from './assets/Dextools.svg'
import { ReactComponent as GithubIcon } from './assets/Github.svg'
import { ReactComponent as MediumIcon } from './assets/Medium.svg'
import { ReactComponent as TelegramIcon } from './assets/Telegram.svg'
import { ReactComponent as TwitterIcon } from './assets/Twitter.svg'
import { SocialNetworksProps } from './types'

const StyledWrapper = styled.div<SocialNetworksProps>`
  display: flex;
  flex-direction: ${({ ispushed }) => (!ispushed ? 'column' : 'row')};
  justify-content: ${({ inPanel }) => (inPanel ? 'space-between' : 'flex-start')};
  margin-top: 50px;
  margin-left: ${({ inPanel }) => (inPanel ? 'auto' : '0')};
  margin-right: ${({ inPanel }) => (inPanel ? 'auto' : '0')};
  margin-bottom: ${({ inPanel }) => (inPanel ? '24px' : '0')};

  @media ${mq.down(breakpoints.sm)} {
    justify-content: flex-start;
    margin-right: initial;
    margin-left: 10px;
  }
`

const LinkItem = styled.a<SocialNetworksProps>`
  cursor: pointer;
  outline: none;
  border: none;
  background: none;

  svg * {
    transition: fill 100ms ease-in-out;
  }

  &:hover svg * {
    fill: #6c5dd3;
  }

  &:not(:last-child) {
    margin-right: 16px;

    ${({ inPanel, ispushed }) =>
      inPanel &&
      (ispushed
        ? `
        margin-right: 12px;
        `
        : `
        margin-right: 0;
        margin-bottom: 12px;
        `)}

    @media ${mq.down(breakpoints.sm)} {
      margin-right: 22px;
    }
  }
`

const links = [
  { href: externalLinks.github, Icon: GithubIcon },
  { href: externalLinks.telegram, Icon: TelegramIcon },
  { href: externalLinks.twitter, Icon: TwitterIcon },
  { href: externalLinks.medium, Icon: MediumIcon },
  { href: externalLinks.coingecko, Icon: CoingeckoIcon },
  { href: externalLinks.bscscan, Icon: BscscanIcon },
  { href: externalLinks.dextools, Icon: DextoolsIcon },
  { href: externalLinks.coinMarketCap, Icon: CoinMarketCapIcon },
]

const SocialNetworks: FC<SocialNetworksProps> = ({ ispushed = true, inPanel = false }) => {
  return (
    <StyledWrapper ispushed={ispushed} inPanel={inPanel}>
      {links.map(({ href, Icon }) => (
        <LinkItem
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          key={href}
          ispushed={ispushed}
          inPanel={inPanel}
        >
          <Icon />
        </LinkItem>
      ))}
    </StyledWrapper>
  )
}

export default SocialNetworks
