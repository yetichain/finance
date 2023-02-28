import dynamic from 'next/dynamic'

const WrapInvestorsAccounComponent = dynamic(() => import('views/InvestorsAccount/InvestorsAccountContainer'), {
  ssr: false,
})

const InvestorsAccount = dynamic(() => import('views/InvestorsAccount'), { ssr: false })

const Account = () => {
  return (
    <WrapInvestorsAccounComponent>
      <InvestorsAccount />
    </WrapInvestorsAccounComponent>
  )
}

export default Account
export { getStaticProps } from 'utils/i18n'
