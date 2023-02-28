import { Card } from 'alium-uikit/src'
import { ReactNode } from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 738px;
  width: 100%;
  z-index: 5;
  border-radius: 6px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function SwapAppBody({ children }: { children: ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
