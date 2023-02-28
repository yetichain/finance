import dynamic from 'next/dynamic'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), {
  ssr: false,
})

const RedirectToAddLiquidity = dynamic(
  () => import('utils/redirects/swap/SwapRedirects').then((module) => module.RedirectToAddLiquidity),
  {
    ssr: false,
  },
)

const CreateSwap = () => {
  return (
    <WrapSwapComponent>
      <RedirectToAddLiquidity />
    </WrapSwapComponent>
  )
}

export default CreateSwap
export { getStaticProps } from 'utils/i18n'
