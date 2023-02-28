export type Breakpoints = string[]

export interface MediaQueries {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  nav: string
}

export type Spacing = number[]

export interface Radii {
  small: string
  default: string
  card: string
  circle: string
}

export interface Shadows {
  level1: string
  active: string
  success: string
  warning: string
  focus: string
  inset: string
}

export interface Gradients {
  bubblegum: string
}

export interface Colors {
  primary: string
  primaryBright: string
  primaryDark: string
  secondary: string
  tertiary: string
  success: string
  failure: string
  warning: string
  contrast: string
  invertedContrast: string
  input: string
  background: string
  backgroundDisabled: string
  text: string
  textDisabled: string
  textSubtle: string
  borderColor: string
  card: string

  // Gradients
  gradients: Gradients

  // Brand colors
  binance: string
}

export interface ZIndices {
  dropdown: number
  modal: number
}
