import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const PoolFinder = dynamic(() => import('views/PoolFinder'), { ssr: false })

const Find = () => {
  return (
    <WrapSwapComponent>
      <PoolFinder />
    </WrapSwapComponent>
  )
}

export default Find
export { getStaticProps } from 'utils/i18n'
