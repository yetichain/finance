import styled from 'styled-components'
import CurrencyLogo from '../CurrencyLogo'

export interface PairCurrencyLogoProps {
  address0: string
  address1: string
}

export default function PairCurrencyLogo({ address0, address1 }: PairCurrencyLogoProps) {
  return (
    <PairCurrencyLogo.Root>
      <CurrencyLogo address={address0} />
      <CurrencyLogo address={address1} />
    </PairCurrencyLogo.Root>
  )
}

PairCurrencyLogo.Root = styled.div`
  display: flex;
  align-items: center;

  ${CurrencyLogo.Root} {
    &:nth-of-type(1) {
      z-index: 1;
    }

    &:nth-of-type(2) {
      margin-left: calc(var(--logo-size) / -2.5);
    }
  }
`
