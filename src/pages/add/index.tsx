import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const AddLiquidity = dynamic(() => import('views/AddLiquidity').then((module) => module), {
  ssr: false,
})

const SwapAdd = () => {
  return (
    <WrapSwapComponent>
      <AddLiquidity />
    </WrapSwapComponent>
  )
}

export default SwapAdd
export { getStaticProps } from 'utils/i18n'
