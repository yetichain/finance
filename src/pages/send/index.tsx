import dynamic from 'next/dynamic'
import { RedirectPathToSwapOnly } from 'utils/redirects/swap/SwapRedirects'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const Send = () => {
  return (
    <WrapSwapComponent>
      <RedirectPathToSwapOnly />
    </WrapSwapComponent>
  )
}

export default Send
export { getStaticProps } from 'utils/i18n'
