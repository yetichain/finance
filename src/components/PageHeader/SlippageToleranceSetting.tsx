import { ButtonMenu, ButtonMenuItem, Flex, Text } from 'alium-uikit/src'
import Numeric from 'alium-uikit/src/components/Numeric'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, useEffect, useState } from 'react'
import { useUserSlippageTolerance } from 'state/user/hooks'
import styled, { useTheme } from 'styled-components'
import QuestionHelper from '../QuestionHelper'

const MAX_SLIPPAGE = 5000
const RISKY_SLIPPAGE_LOW = 50
const RISKY_SLIPPAGE_HIGH = 500

const predefinedValues = [
  { label: '0,1%', value: 0.1 },
  { label: '0,5%', value: 0.5 },
  { label: '1%', value: 1 },
]

const SlippageToleranceSettings = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [value, setValue] = useState(userSlippageTolerance / 100)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target

    setValue(parseFloat(inputValue))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 100
      if (!Number.isNaN(rawValue) && rawValue > 0 && rawValue < MAX_SLIPPAGE) {
        setUserslippageTolerance(rawValue)
        setError(null)
      } else {
        setError(t('Enter a valid deadline'))
      }
    } catch {
      setError(t('Enter a valid deadline'))
    }
  }, [t, value, setError, setUserslippageTolerance])

  // Notify user if slippage is risky
  useEffect(() => {
    if (userSlippageTolerance < RISKY_SLIPPAGE_LOW) {
      setError(t('Your transaction may fail'))
    } else if (userSlippageTolerance > RISKY_SLIPPAGE_HIGH) {
      setError(t('Your transaction may be frontrun'))
    }
  }, [userSlippageTolerance, setError])

  const getActiveIndex = () => {
    const values = predefinedValues.map((_value) => _value.value)
    return values.indexOf(value)
  }

  const activeIndex = getActiveIndex()

  return (
    <StyledSlippageToleranceSettings>
      <Label>
        <Text style={{ fontWeight: 600 }}>{t('Slippage tolerance')}</Text>
        <QuestionHelper
          text={t('Your transaction will revert if the price changes unfavorably by more than this percentage.')}
        />
      </Label>

      <Options>
        <StyledButtonMenu
          size='sm'
          variant='primary'
          activeIndex={activeIndex}
          onClick={(index) => {
            setValue(predefinedValues[index].value)
          }}
        >
          {predefinedValues.map((valueElement) => (
            <StyledButtonItem key={valueElement.value} variant={value === valueElement.value ? 'primary' : 'tertiary'}>
              {valueElement.label}
            </StyledButtonItem>
          ))}
        </StyledButtonMenu>
        <PercentInputWrapper>
          <Flex alignItems='center'>
            <Field style={{ width: '100%' }}>
              <Numeric
                type='number'
                scale='lg'
                step={0.1}
                min={0.1}
                placeholder='0.1'
                value={value}
                onChange={handleChange}
                isWarning={error !== null}
                style={{
                  maxWidth: '325.7px',
                  width: '100%',
                  height: '48px',
                }}
              />
              <Text color={theme.colors.textSubtle} fontSize='18px' style={{ width: 'auto' }}>
                %
              </Text>
            </Field>
          </Flex>
        </PercentInputWrapper>
      </Options>
      {error && (
        <Text mt='8px' color='failure' style={{ height: '0px' }}>
          {error}
        </Text>
      )}
    </StyledSlippageToleranceSettings>
  )
}

export default SlippageToleranceSettings

// styles

const StyledSlippageToleranceSettings = styled.div`
  margin-bottom: 16px;
`

const Field = styled.div`
  display: flex;
  align-items: center;

  & > ${Text} {
    width: 52px;
    font-size: 14px;
    margin-left: 18px;
  }
`

const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;

  & > div {
    width: 100%;
    height: 48px;

    &:first-child {
      padding-top: 8px;
      padding-bottom: 8px;
      flex-basis: 90%;
      margin-right: 8px;
    }
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const StyledButtonMenu = styled(ButtonMenu)`
  padding-top: 8px;
  padding-bottom: 8px;
`

const StyledButtonItem = styled(ButtonMenuItem)`
  padding: 6px 20px;
  width: 100%;
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;

  & > div {
    letter-spacing: -0.1px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 8px;
  }
`

const PercentInputWrapper = styled.div`
  margin-left: 10px;

  @media screen and (max-width: 480px) {
    margin-left: 0;
    margin-top: 18px;
  }
`
