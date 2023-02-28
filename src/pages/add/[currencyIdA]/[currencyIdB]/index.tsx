import dynamic from 'next/dynamic'
import { RedirectDuplicateTokenIds } from 'utils/redirects/swap/SwapRedirects'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const SwapAddMultipleCurrency = () => {
  return (
    <WrapSwapComponent>
      <RedirectDuplicateTokenIds type='add' />
    </WrapSwapComponent>
  )
}

export default SwapAddMultipleCurrency
export { getStaticProps as getServerSideProps } from 'utils/i18n'
