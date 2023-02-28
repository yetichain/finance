import { FC } from 'react'
import NumericInput from 'react-numeric-input'
import styled from 'styled-components'
import { numberAndDot } from 'utils/common/numberAndDot'
import { getBoxShadow, getHeight, StyledInputProps } from '../Input/Input'
import { scales } from '../Input/types'
import { ArrowNumeric } from './ArrowNumeric'
import style from './Numeric.module.scss'

export const NumericStyled = styled(NumericInput)`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px !important;
  /* height: ${getHeight}; */
  outline: 0;
  padding: 0 16px !important;
  width: 100%;
  height: inherit !important;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`

const Controls = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
  width: 14px;
  height: 28px;
  /* background: #e6e6f6; */
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  svg {
    background: #e6e6f6;
    height: 14px;
    cursor: pointer;
    padding: 4px;
    width: 14px;
    transition: 0.1s all ease;
    outline: none;
    box-shadow: none;
    &:active {
      opacity: 0.5;
      outline: none;
      box-shadow: none;
    }
    &:hover {
      outline: none;
      box-shadow: none;
    }
  }
  b:first-of-type {
  }

  div {
    outline: none;
    display: flex;

    &:active {
      outline: none;
      box-shadow: none;
    }
    &:hover {
      outline: none;
      box-shadow: none;
    }
  }
  div:last-of-type {
    svg {
      transform: rotate(-180deg);
      -ms-transform: rotate(-1800deg); /* IE 9 */
      -webkit-transform: rotate(-180deg); /* Safari and Chrome */
    }
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const Numeric: FC<StyledInputProps> = ({ ...other }) => {
  const step = Number(other?.step) || 1
  const change = (eventOrValue) => {
    const value = eventOrValue?.target ? eventOrValue?.target?.value : eventOrValue
    if (!numberAndDot(value)) {
      eventOrValue?.currentTarget?.blur()
    }

    if (eventOrValue?.target) {
      other?.onChange(eventOrValue)
    } else {
      // mocked event
      const event = {
        target: {
          value: eventOrValue,
        },
      }
      // @ts-ignore
      other?.onChange(event)
    }
  }
  const controlUp = () => {
    const value = Number(other?.value) + step

    return change(value.toFixed(2))
  }
  const controlDown = () => {
    const value = Number(other?.value) - step
    if (value < 0) {
      return
    }
    return change(value.toFixed(1))
  }
  return (
    <InputWrapper style={other?.style ? { ...other?.style } : {}} className={`${style.numeric} ${style.hidecontrols}`}>
      <NumericStyled
        className='form-control'
        {...other}
        step={step}
        onChange={change}
        onKeyDown={change}
        onKeyPress={change}
        onKeyUp={change}
      />
      <Controls>
        <div onClick={controlUp}>
          <ArrowNumeric />
        </div>
        <div onClick={controlDown}>
          <ArrowNumeric />
        </div>
      </Controls>
    </InputWrapper>
  )
}
Numeric.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
}

export default Numeric
