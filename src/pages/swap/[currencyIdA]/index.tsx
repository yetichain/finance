import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const Swap = dynamic(() => import('views/Swap'), { ssr: false })

const SwapExchangeCurrencyIdA = () => {
  return (
    <WrapSwapComponent>
      <Swap />
    </WrapSwapComponent>
  )
}

export default SwapExchangeCurrencyIdA
export { getStaticProps as getServerSideProps } from 'utils/i18n'
