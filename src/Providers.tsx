import config from 'config/swr'
import Provider from 'providers/InvestorsProvider'
import { FC } from 'react'
import { SWRConfig } from 'swr'

const Providers: FC = ({ children }) => {
  return (
    <SWRConfig value={config}>
      <Provider>{children}</Provider>
    </SWRConfig>
  )
}

export default Providers
