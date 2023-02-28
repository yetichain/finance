import { Button } from 'alium-uikit/src'
import styled from 'styled-components'

export const BridgeTransferButton = styled(Button)<{ desktop?: boolean; mobile?: boolean }>`
  &:disabled {
    background: #cbc8ee !important;
    color: #ffffff !important;
  }
  ${(props) => props.mobile && 'display: none'};
  @media screen and (max-width: 600px) {
    ${(props) => props.desktop && 'display: none'};
    ${(props) => props.mobile && 'display: block'};
  }
`
