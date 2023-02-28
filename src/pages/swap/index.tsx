import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const Swap = dynamic(() => import('views/Swap'), { ssr: false })

const SwapPage = () => {
  return (
    <WrapSwapComponent>
      <Swap />
    </WrapSwapComponent>
  )
}

export default SwapPage
export { getStaticProps } from 'utils/i18n'
