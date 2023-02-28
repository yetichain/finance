import 'inter-ui'
import { useEffect } from 'react'
import styled from 'styled-components'
import ApplicationUpdater from '../../state/application/updater'
import ListsUpdater from '../../state/lists/updater'
import MulticallUpdater from '../../state/multicall/updater'
import TransactionUpdater from '../../state/transactions/updater'

const WrapInvestorsAccounComponent = ({ children }) => {
  useEffect(() => {
    if ('ethereum' in window) {
      ;(window.ethereum as any).autoRefreshOnNetworkChange = false
    }

    window.addEventListener('error', () => {
      localStorage?.removeItem('redux_localstorage_simple_lists')
    })
  }, [])
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
      <AppWrapper>
        <BodyWrapper>{children}</BodyWrapper>
      </AppWrapper>
    </>
  )
}
export default WrapInvestorsAccounComponent

// styles

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  width: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  padding: 42px 0;
  width: 100%;
  height: auto;
  background: transparent;

  @media screen and (max-width: 1170px) {
    padding: 0;
  }

  @media screen and (max-width: 850px) {
    padding: 22px 0;
  }
`
