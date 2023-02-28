import styled from 'styled-components'
import { getBridgeLayout } from '../BridgeLayout'
import BackLink from './components/BackLink'
import HistoryTable from './components/HistoryTable'

export default function BridgeHistory() {
  return (
    <BridgeHistory.Root>
      <BackLink href='/bridge' />
      <HistoryTable />
    </BridgeHistory.Root>
  )
}

BridgeHistory.Root = styled.div`
  padding: 24px;

  & > * + * {
    margin-top: 24px;
  }
`

BridgeHistory.getLayout = getBridgeLayout
