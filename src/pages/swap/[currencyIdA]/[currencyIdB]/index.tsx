import dynamic from 'next/dynamic'
import { RedirectDuplicateTokenIds } from 'utils/redirects/swap/SwapRedirects'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const SwapExchangeMultipleCurrency = () => {
  return (
    <WrapSwapComponent>
      <RedirectDuplicateTokenIds type='exchange' />
    </WrapSwapComponent>
  )
}

export default SwapExchangeMultipleCurrency
export { getStaticProps as getServerSideProps } from 'utils/i18n'
