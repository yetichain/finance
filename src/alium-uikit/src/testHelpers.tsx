import { render, RenderResult } from '@testing-library/react'
import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { light } from './theme'

export const renderWithTheme = (component: ReactNode, theme = light): RenderResult => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}
