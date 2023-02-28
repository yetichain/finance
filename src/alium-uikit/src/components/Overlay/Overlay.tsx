import styled from 'styled-components'
import { OverlayProps } from './types'

const Overlay = styled.div.attrs({ role: 'presentation' })<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(11, 19, 89, 0.9);
  transition: opacity 0.4s;
  opacity: ${({ show }) => (show ? 1 : 0)};
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: ${({ show }) => (show ? 'initial' : 'none')};
`

Overlay.defaultProps = {
  show: false,
  zIndex: 10,
}

export default Overlay
