import copy from 'copy-to-clipboard'
import React, { FC } from 'react'
import styled from 'styled-components'
import { IconCopy } from 'views/Migrate/components/IconCopy'

const Input = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  .copy {
    padding: 12px 16px;
    width: 100%;
    max-width: 354px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;
    border: 1px solid #d2d6e5;
    border-radius: 6px;
  }

  .copy input {
    padding-right: 16px;
    border: none;
    outline: none;
    width: 100%;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #8990a5;
  }

  .copy svg {
    cursor: pointer;
  }
`
interface Props {
  value: string
}
const CopyInput: FC<Props> = ({ value }) => {
  return (
    <Input>
      <div className='copy'>
        <input type='text' value={value} />
        <div onClick={() => copy(value)}>
          <IconCopy />
        </div>
      </div>
    </Input>
  )
}

export default CopyInput
