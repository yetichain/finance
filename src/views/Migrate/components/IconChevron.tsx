import { FC } from 'react'

interface props {
  inverted?: boolean
}

export const IconChevron: FC<props> = ({ inverted }) => {
  return inverted ? (
    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1 6.5L6.00362 1.5L11 6.5'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ) : (
    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 1.5L5.99638 6.5L1 1.5'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
