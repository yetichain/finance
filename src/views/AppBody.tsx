import { Card } from 'alium-uikit/src'
import { ReactNode } from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled(Card)`
  position: relative;
  width: 100%;
  z-index: 5;
  border-radius: 6px;
  box-sizing: border-box;
  background: transparent;
  box-shadow: none;
  padding: 0;

  @media screen and (max-width: 790px) {
    padding: 16px 10px;
  }

  // @media screen and (max-width: 641px) {
  //   padding: 16px;
  // }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
