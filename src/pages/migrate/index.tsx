import dynamic from 'next/dynamic'
import ViewMigrate from 'views/Migrate/Migrate'

const WrapSwapComponent = dynamic(() => import('views/Swap/SwapContainter'), { ssr: false })

const MigratePage = () => {
  return (
    <WrapSwapComponent>
      <ViewMigrate />
    </WrapSwapComponent>
  )
}

export default MigratePage
export { getStaticProps } from 'utils/i18n'
