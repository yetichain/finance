import { Input } from 'alium-uikit/src'
import { useBridgeContext } from 'contexts/BridgeContext'
import { utils } from 'ethers'
import { BridgeAdvancedMinus } from 'images/bridge/BridgeAdvancedMinus'
import { BridgeAdvancedPlus } from 'images/bridge/BridgeAdvancedPlus'
import { useTranslation } from 'next-i18next'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

const AdvancedInput: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation()
  const [showInput, setShowInput] = useState(false)
  const { setReceiver, receiver } = useBridgeContext()

  const [touched, setTouched] = useState(false)
  const valid = React.useMemo(() => utils.isAddress(receiver), [receiver])

  const updateInput = (value: string) => {
    setReceiver(value)
  }

  const clear = () => {
    if (!valid) {
      setReceiver('')
      setTouched(false)
    }
  }
  React.useEffect(() => {
    if (!showInput) {
      clear()
    }
  }, [showInput])
  const showError = touched && !valid && receiver?.length >= 1

  return (
    <>
      {showInput && (
        <>
          <StyledInput
            placeholder={t('Recipient Address')}
            value={receiver}
            onChange={({ target }) => {
              updateInput(target?.value)
            }}
            onFocus={(event) => {
              setTouched(true)
            }}
            notValid={showError}
          />
          {showError && <ErrorText>{t('Wrong address')}</ErrorText>}
        </>
      )}
      <AdvanceWrapper>
        {children && children}
        <Advanced onClick={() => setShowInput(!showInput)}>
          {t('Advanced')}
          {showInput ? <BridgeAdvancedMinus /> : <BridgeAdvancedPlus />}
        </Advanced>
      </AdvanceWrapper>
    </>
  )
}

export default AdvancedInput

// styles

const AdvanceWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    max-width: 340px;
  }
`

const Advanced = styled.div`
  text-align: right;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  width: fit-content;
  user-select: none;
  letter-spacing: 1px;
  color: #8990a5;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    margin-left: 8px;
  }
`

const StyledInput = styled(Input)<{ notValid: boolean }>`
  margin-top: 8px;
  max-width: 340px;
  height: 48px;
  width: 340px;
  ${(props) => props.notValid && 'border: 1px solid #FF4D00;'}

  &:focus {
    box-shadow: none !important;
  }

  &::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #8990a5;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    max-width: initial;
  }
`

const ErrorText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #ff4d00;
  margin-top: 4px;
`
