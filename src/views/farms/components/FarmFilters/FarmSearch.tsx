import { CloseIcon } from 'alium-uikit/src'
import useOnClickOutside from 'hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'
import { Search } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled, { css } from 'styled-components'
import { breakpoints, mq } from 'ui'

const FarmSearch = () => {
  const { t } = useTranslation()
  const [active, setActive] = useState(false)
  const [isFocused, setFocus] = useState(false)

  const input = useRef(null)
  const inputWrapper = useRef(null)
  const value = useStoreFarms((state) => state.query)
  const setValue = useStoreFarms((state) => state.setQuery)

  const isFilled = value?.length > 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const clickInput = () => {
    setActive(!active)
    input.current.focus()
  }

  const clearInput = () => {
    setValue('')
    input.current.focus()
  }

  const closeInput = () => {
    setActive(false)
  }

  useOnClickOutside(inputWrapper, closeInput)

  return (
    <SearchWrapper activeFullWidth={active} $isFocused={isFocused} ref={inputWrapper}>
      <SearchInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={input}
        $isFilled={isFilled}
        activeFullWidth={active}
        placeholder={t('Search Farms')}
        value={value}
        onChange={handleChange}
      />
      {isFilled && (
        <IconClose onClick={clearInput} activeFullWidth={active}>
          <CloseIcon />
        </IconClose>
      )}
      <IconSearch onClick={clickInput}>
        <Search />
      </IconSearch>
    </SearchWrapper>
  )
}

// styles

const SearchWrapper = styled.div<{ activeFullWidth: boolean; $isFocused: boolean }>`
  display: flex;
  width: 257px;
  height: 48px;
  border: 1px solid #d2d6e5;
  color: #8990a5;
  background-color: #fff;
  border-radius: 6px;

  ${({ $isFocused }) =>
    $isFocused
      ? css`
          border-color: #6c5dd3;
          color: #6c5dd3;
        `
      : css`
          &:hover {
            border: 1px solid #8990a5;
          }
        `}

  @media ${mq.down(breakpoints.lg)} {
    position: absolute;
    width: 48px;
    right: 16px;
    display: flex;
    transition: all 0.4s cubic-bezier(0, 0.795, 0, 1);

    ${({ activeFullWidth }) =>
      activeFullWidth &&
      css`
        width: calc(100% - 32px);
      `}
  }
`

const SearchInput = styled.input<{ $isFilled: boolean; activeFullWidth: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 0 0 0 16px;
  border: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  flex: 1;
  transition: all 0.4s cubic-bezier(0, 0.795, 0, 1);

  ${({ $isFilled }) =>
    $isFilled &&
    css`
      &:focus {
        color: #6c5dd3;
      }
    `}

  &:hover,
  &:active,
  &:focus {
    outline: none;
    border: none;
  }

  @media ${mq.down(breakpoints.lg)} {
    ${({ activeFullWidth }) =>
      !activeFullWidth &&
      css`
        width: 0;
        padding: 0;
        opacity: 0;
      `}
  }
`

const IconSearch = styled.div`
  display: flex;
  width: 46px;
  cursor: pointer;

  svg {
    margin: auto;
    stroke: #8990a5;
  }
`

const IconClose = styled.div<{ activeFullWidth: boolean }>`
  display: flex;
  min-width: 24px;
  cursor: pointer;
  margin: 0 4px;

  svg {
    margin: auto;
  }
`

export default FarmSearch
