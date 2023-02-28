import 'styled-components'
import { AliumTheme } from './theme'

declare module 'styled-components' {
  export type DefaultTheme = AliumTheme
}
