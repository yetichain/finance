import { HelpIcon } from 'alium-uikit/src'
import { ReactNode, useCallback, useState } from 'react'
import styled from 'styled-components'
import Tooltip from '../Tooltip'

export interface QuestionHelperProps {
  text: ReactNode
  bordered?: boolean
  className?: string
}

export default function QuestionHelper({ text, bordered, className }: QuestionHelperProps) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <QuestionHelper.Root className={className} style={{ marginLeft: 4 }}>
      <Tooltip classNameContainer={`${className}__tooltip`} text={text} show={show}>
        <QuestionHelper.Wrapper onClick={open} onMouseEnter={open} onMouseLeave={close} bordered={bordered}>
          <HelpIcon />
        </QuestionHelper.Wrapper>
      </Tooltip>
    </QuestionHelper.Root>
  )
}

QuestionHelper.Root = styled.span``

QuestionHelper.Wrapper = styled.div<{ bordered?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  color: ${({ theme }) => theme.colors.textSubtle};

  ${({ bordered }) =>
    bordered &&
    `
      border: 1px solid #d2d6e5;
      box-sizing: border-box;
      border-radius: 6px;
      width: 40px;
      height: 40px;
    `}

  :hover,
  :focus {
    opacity: 0.7;
  }
`
