/* eslint-disable spaced-comment */

/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  const ReactComponent: import('react').FC<import('react').SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
}
