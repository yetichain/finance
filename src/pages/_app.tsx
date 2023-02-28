import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'
import { ResetCSS } from 'alium-uikit/src'
import Loaders from 'components/Loaders'
import MetaHeader from 'components/MetaHeader'
import ToastListener from 'components/ToastListener'
import 'config/bignumber'
import EagerConnectContainer from 'connectors/EagerConnectContainer'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from 'next-i18next.config'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import type { ReactElement, ReactNode } from 'react'
import { InitStores } from 'store/InitStores'
import GlobalStyle from 'style/Global'
import 'typeface-roboto'
import GTM from 'utils/gtm'
import MenuWrappedRoute from '../components/Menu'
const Providers = dynamic(() => import('Providers'), { ssr: false })

const Popups = dynamic(() => import('components/Popups'), { ssr: false })

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type MyAppProps = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <MetaHeader />
      <InitStores />
      <GTMProvider state={GTM.params}>
        <Providers>
          <EagerConnectContainer />
          <Popups />

          <ResetCSS />
          <GlobalStyle />
          <MenuWrappedRoute loginBlockVisible>
            <Loaders />
            {getLayout(<Component {...pageProps} />)}
          </MenuWrappedRoute>
          <ToastListener />
        </Providers>
      </GTMProvider>
    </>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
