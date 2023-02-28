import { createGlobalStyle } from 'styled-components'

const SwapGlobal = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default SwapGlobal
