import styled from 'styled-components'
import { formatAddress } from 'views/StrongHoldersPool/utils'
import Copy from '../Copy'

export interface CopyableAddressProps {
  address: string
}

export default function CopyableAddress({ address }: CopyableAddressProps) {
  return (
    <CopyableAddress.Root>
      {formatAddress(address, 8, 6)}
      <Copy text={address} />
    </CopyableAddress.Root>
  )
}

CopyableAddress.Root = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 16px;
`
