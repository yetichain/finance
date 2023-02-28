import { Input, InputProps } from 'alium-uikit/src'
import { FC } from 'react'
import styled from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'

const LabelRow = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  color: #6c5dd3;
  position: absolute;
  background: white;
  top: -8px;
  left: 10px;
  padding-right: 5px;
  padding-left: 5px;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid #d2d6e5;
  position: relative;
  border-radius: 6px;
  background-color: transparent;
  z-index: 1;
`

interface Props extends InputProps {
  label: string
}

const InputWithLabel: FC<Props> = ({ id, label = TranslateString(132, 'Input'), ...other }) => {
  return (
    <InputPanel id={id}>
      <LabelRow>{label}</LabelRow>
      <Input {...other} />
    </InputPanel>
  )
}

export default InputWithLabel
