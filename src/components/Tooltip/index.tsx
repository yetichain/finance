import { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'
import Popover, { PopoverProps } from '../Popover'

const TooltipContainer = styled.div`
  width: 228px;
  padding: 0.6rem 1rem;
  line-height: 150%;
  font-weight: 400;
  color: #8990a5;
  box-shadow: 0 2px 16px rgba(185, 189, 208, 0.48);
  border-radius: 6px;
`

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: ReactNode
  classNameContainer?: string
}

export default function Tooltip({ text, ...rest }: TooltipProps) {
  return (
    <Popover
      content={<TooltipContainer className={rest?.classNameContainer || ''}>{text}</TooltipContainer>}
      {...rest}
    />
  )
}

export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  )
}
