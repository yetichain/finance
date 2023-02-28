import { FC } from 'react'
import { SvgProps } from '../types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M7.92139 6.3208V10.8514' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M10.186 8.58618L5.65545 8.58618' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' />
      <g opacity='0.5'>
        <path d='M9.52344 14.4756L6.31983 17.6792' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' />
        <path d='M9.52344 17.6792L6.31983 14.4756' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' />
      </g>
      <path
        opacity='0.5'
        d='M18.3418 8.58618L13.8112 8.58618'
        stroke='#8990A5'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path d='M18.3418 14.4758L13.8112 14.4758' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M18.3418 17.1941L13.8112 17.1941' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  )
}

export default Icon
