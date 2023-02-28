import { FC } from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string
  isFinished?: boolean
}

const StyledLabel = styled.div<{ isFinished: boolean }>`
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'primary']};
  font-size: 14px;
`

const Label: FC<LabelProps> = ({ text, isFinished = false }) => (
  <StyledLabel isFinished={isFinished}>{text}</StyledLabel>
)

export default Label
