const backgroundImageOld = '/images/trade-background_old.svg'
const backgroundImage = '/images/trade-background.svg'

import styled from 'styled-components'
import ApplicationUpdater from '../../state/application/updater'
import ListsUpdater from '../../state/lists/updater'
import MulticallUpdater from '../../state/multicall/updater'
import TransactionUpdater from '../../state/transactions/updater'

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
  width: 100%;
  padding: 32px 20%;
  padding: 32px 24px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;

  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: top right;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-position: top 18px right 82px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px 18.6% 32px 18.6%;
  }

  @media screen and (max-width: 768px) {
    padding: 38px 24px;
  }
  @media screen and (max-width: 500px) {
    padding: 32px 11px;
    background-image: url(${backgroundImageOld});
  }
`

const WrapSwapComponent = ({ children }) => {
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

export default WrapSwapComponent
