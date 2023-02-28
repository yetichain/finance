import { ChainId } from '@alium-official/sdk'
import { useWeb3React } from '@web3-react/core'
import { externalLinks, Menu as UikitMenu, MenuEntry, useModal } from 'alium-uikit/src'
// import { getMainDomain } from 'alium-uikit/src/util/getMainDomain'
import ConnectionPending from 'components/ConnectionPending/ConnectionPending'
// import { isProduction } from 'config'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { ROUTES } from 'routes'
import { getExplorerLink, useExplorerName } from 'utils'
import RecentTransactionsModal from '../PageHeader/RecentTransactionsModal'

const Menu: FC<{ loginBlockVisible?: boolean }> = ({ loginBlockVisible, ...props }) => {
  const { t } = useTranslation()

  const links: MenuEntry[] = [
    {
      label: t('Home'),
      icon: 'HomeIcon',
      href: ROUTES.home,
      exact: true,
    },
    {
      label: t('Trade'),
      icon: 'TradeIcon',
      triggers: [ROUTES.pool, ROUTES.exchange],
      items: [
        { label: t('Exchange'), href: ROUTES.exchange },
        { label: t('Liquidity'), href: ROUTES.pool, exact: true },
        { label: t('Migrate'), href: ROUTES.migrate },
      ],
    },
    { label: t('Farms'), icon: 'FarmIcon', href: ROUTES.farms },
    { label: t('Strong Holders Pool'), icon: 'ShpIcon', href: ROUTES.shp },
    { label: t('Bridge'), icon: 'BridgeIcon', href: ROUTES.bridge },
    { label: t('Token holder area'), icon: 'PrivateRoundIcon', href: ROUTES.tokenHolderArea },
    /* {
      label: 'Analytics',
      icon: 'InfoIcon',
      items: [
        { label: t('Overview'), href: `https://info.${getMainDomain()}` },
        { label: t('Tokens'), href: `https://info.${getMainDomain()}/tokens` },
        { label: t('Pairs'), href: `https://info.${getMainDomain()}/pairs` },
      ],
    }, */
    {
      label: t('More'),
      icon: 'MoreIcon',
      triggers: [ROUTES.audits],
      items: [
        { label: t('Audits'), href: ROUTES.audits },
        // { label: t('Voting'), href: 'https://voting.dev.alium.finance' },
        { label: t('GitHub'), href: externalLinks.github },
        { label: t('Docs'), href: 'https://docs.yetichain.com/' },
        { label: t('Blog'), href: externalLinks.medium },
      ],
    },
    { label: t('YETI NFT'), icon: 'IconArt', href: `https://yetichain.art` },
    {
      label: t('We are hiring'),
      isPulsing: true,
      icon: 'VacanciesIcon',
      href: `https://docs.yetichain.com`,
    },
  ]

  const { account } = useWeb3React()

  const { chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()

  const { isDark, toggleTheme } = useTheme()

  const { explorerName } = useExplorerName(chainId)
  const explorerLink = getExplorerLink(chainId as ChainId, account as string, 'address')

  const [transactionsHistoryModal] = useModal(<RecentTransactionsModal />)

  return (
    <>
      <ConnectionPending />
      <UikitMenu
        // isProduction={isProduction}
        links={links}
        account={account as string}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        loginBlockVisible={loginBlockVisible}
        buttonTitle={t('Connect')}
        explorerName={explorerName}
        explorerLink={explorerLink}
        onTransactionHistoryHandler={transactionsHistoryModal}
        {...props}
      />
    </>
  )
}

export default Menu
