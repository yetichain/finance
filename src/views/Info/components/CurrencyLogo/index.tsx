import { getAddress } from '@ethersproject/address'
import { useUpdate } from 'react-use'
import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import { isAddress } from 'utils'
import defaultIconUrl from './assets/default.svg'

export interface CurrencyLogoProps extends inferStyledProps<typeof CurrencyLogo['Root']> {
  address: string
}

const BAD_SRCS = {}

export default function CurrencyLogo({ address, ...restProps }: CurrencyLogoProps) {
  const update = useUpdate()
  const validAddress = isAddress(address)
  const src = validAddress
    ? `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${getAddress(address)}/logo.png`
    : defaultIconUrl
  return (
    <CurrencyLogo.Root {...restProps}>
      <img
        src={BAD_SRCS[src] ? defaultIconUrl : src}
        onError={() => {
          if (validAddress) {
            BAD_SRCS[src] = true
          }
          update()
        }}
      />
    </CurrencyLogo.Root>
  )
}

CurrencyLogo.Root = styled.div`
  --logo-size: 24px;
  width: var(--logo-size);
  height: var(--logo-size);
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  padding: 1px;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  flex-shrink: 0;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`
