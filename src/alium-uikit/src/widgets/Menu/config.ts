import { getMainDomain } from 'alium-uikit/src/util/getMainDomain'
import { externalLinks } from '../../config'

export const links = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',

    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: `https://exchange.${getMainDomain()}`,
      },
      {
        label: 'Liquidity',
        href: `https://exchange.${getMainDomain()}/#/pool`,
      },
      {
        label: 'Liquidity',
        href: `https://exchange.${getMainDomain()}/#/pool`,
      },
    ],
  },
  {
    label: 'Private Round NFTs',
    icon: 'PrivateRoundIcon',
    href: '/account',
  },
  {
    label: 'Analytics',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Github',
        href: externalLinks.github,
      },
      {
        label: 'Docs',
        href: `https://docs.${getMainDomain()}`,
      },
      {
        label: 'Blog',
        href: externalLinks.medium,
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: externalLinks.github,
      },
      {
        label: 'Docs',
        href: `https://docs.${getMainDomain()}`,
      },
      {
        label: 'Blog',
        href: externalLinks.medium,
      },
    ],
  },
  { label: 'YETI NFT', icon: 'IconArt', href: `https://ayetichain.art` },
]

export const socials = [
  {
    label: 'GitHub',
    icon: 'GitHubIcon',
    href: externalLinks.github,
  },
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: externalLinks.telegram,
  },
  {
    label: 'Twitter',
    icon: 'TwitterIcon',
    href: externalLinks.twitter,
  },
  {
    label: 'Medium',
    icon: 'MediumIcon',
    href: externalLinks.medium,
  },
  {
    label: 'CoinGecko',
    icon: 'CoinGeckoIcon',
    href: externalLinks.coingecko,
  },
  {
    label: 'Bscscan',
    icon: 'BscscanIcon',
    href: externalLinks.bscscan,
  },
  {
    label: 'Dextools',
    icon: 'DextoolsIcon',
    href: externalLinks.dextools,
  },
  {
    label: 'Coin Market Cap',
    icon: 'CoinMarketCapIcon',
    href: externalLinks.coinMarketCap,
  },
]

export const MENU_HEIGHT = 97
// export const MENU_ENTRY_HEIGHT = 53
export const SIDEBAR_WIDTH_FULL = 256
export const SIDEBAR_WIDTH_REDUCED = 88
