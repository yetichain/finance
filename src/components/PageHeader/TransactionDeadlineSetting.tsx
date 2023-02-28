import { Text } from 'alium-uikit/src'
import Numeric from 'alium-uikit/src/components/Numeric'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, useEffect, useState } from 'react'
import { useUserDeadline } from 'state/user/hooks'
import styled, { useTheme } from 'styled-components'
import QuestionHelper from '../QuestionHelper'

const TransactionDeadlineSetting = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target

    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError(t('Enter a valid deadline'))
      }
    } catch {
      setError(t('Enter a valid deadline'))
    }
  }, [t, value, setError, setDeadline])

  return (
    <StyledTransactionDeadlineSetting>
      <Label>
        <Text style={{ fontWeight: 600 }}>{t('Transaction deadline')}</Text>
        <QuestionHelper text={t('Your transaction will revert if it is pending for more than this long.')} />
      </Label>
      <Field>
        <Numeric
          type='number'
          step='1'
          min='1'
          placeholder='1'
          value={value}
          onChange={handleChange}
          style={{
            width: '100%',
            maxWidth: '301.7px',
            height: '48px',
          }}
        />
        <Text color={theme.colors.textSubtle}>{t('Minutes')}</Text>
      </Field>
      {error && (
        <Text mt='8px' color='failure'>
          {error}
        </Text>
      )}
    </StyledTransactionDeadlineSetting>
  )
}

export default TransactionDeadlineSetting

// styles

const StyledTransactionDeadlineSetting = styled.div`
  margin-bottom: 16px;
  margin-top: 20px;

  @media screen and (max-width: 480px) {
    margin-top: 10px;
  }
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 14px;

  & > div {
    letter-spacing: -0.1px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 8px;
  }
`

const Field = styled.div`
  display: flex;
  align-items: center;

  & > ${Text} {
    min-width: 52px;
    font-size: 14px;
    margin-left: 16px;
  }
`
