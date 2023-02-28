import { ComponentType } from 'react'

type inferStyledProps<T> = T extends ComponentType<infer Props>
  ? Props extends object
    ? Props & Record<string, any>
    : never
  : never

export default inferStyledProps
