import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

const StyledRangeInput = styled.input<{ size: number }>`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background: #ffffff;
    box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
    border-radius: 16px;
    border-radius: 100%;
    border: none;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.invertedContrast};

    &::before {
      content: ' ';
      width: 10px;
      height: 10px;
      position: absolute;
      background: black;
      z-index: 2313;
    }

    &:hover,
    &:focus {
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08), 0 16px 24px rgba(0, 0, 0, 0.06),
        0 24px 32px rgba(0, 0, 0, 0.04);
    }
  }

  &::-moz-range-thumb {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: #565a69;
    border-radius: 100%;
    border: none;
    color: ${({ theme }) => theme.colors.invertedContrast};

    &:hover,
    &:focus {
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08), 0 16px 24px rgba(0, 0, 0, 0.06),
        0 24px 32px rgba(0, 0, 0, 0.04);
    }
  }

  &::-ms-thumb {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    background-color: #565a69;
    border-radius: 100%;
    color: ${({ theme }) => theme.colors.invertedContrast};

    &:hover,
    &:focus {
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08), 0 16px 24px rgba(0, 0, 0, 0.06),
        0 24px 32px rgba(0, 0, 0, 0.04);
    }
  }

  &::-webkit-slider-runnable-track {
    background: #24ba7b;
    height: 2px;
  }

  &::-moz-range-track {
    background: #24ba7b;
    height: 2px;
  }

  &::-ms-track {
    width: 100%;
    border-color: transparent;
    color: transparent;

    background: ${({ theme }) => theme.colors.primaryDark};
    height: 2px;
  }
  &::-ms-fill-lower {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  &::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`

interface InputSliderProps {
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  max?: number
  size?: number
}

export default function Slider({ value, onChange, min = 0, step = 1, max = 100, size = 28 }: InputSliderProps) {
  const [range, setRange] = useState(value)
  const rangeFromLiqudity = React.useMemo(() => value, [value])
  React.useEffect(() => {
    setRange(rangeFromLiqudity)
  }, [rangeFromLiqudity])

  const updateRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(parseInt(e.target.value, 10))
  }
  const changeCallback = (e) => {
    onChange(parseInt(e.target.value, 10))
    updateRange(e)
  }

  return (
    <StyledRangeInput
      size={size}
      type='range'
      value={range}
      style={{ width: '100%', padding: '15px 0' }}
      // if you need hot update when slide change updateRange to changeCallback
      onChange={updateRange}
      onMouseUp={changeCallback}
      onPointerUp={changeCallback}
      onTouchEnd={changeCallback}
      aria-labelledby='input slider'
      step={step}
      min={min}
      max={max}
    />
  )
}
