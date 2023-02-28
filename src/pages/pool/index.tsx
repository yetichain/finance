import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const Pool = dynamic(() => import('views/Pool'), { ssr: false })

const PoolPage = () => {
  return (
    <WrapSwapComponent>
      <Pool />
    </WrapSwapComponent>
  )
}

export default PoolPage
export { getStaticProps } from 'utils/i18n'
