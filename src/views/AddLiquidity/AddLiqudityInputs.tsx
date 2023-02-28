import { Currency, TokenAmount } from '@alium-official/sdk'
import { ColumnCenter } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { LiqudityIcon } from 'images/Liqudity-icon'
import { useTranslation } from 'next-i18next'
import { FC, memo, useState } from 'react'
import { Field } from 'state/mint/actions'
import styled from 'styled-components'

interface Props {
  formattedAmounts: any
  onFieldAInput: (typedValue: string) => void
  maxAmounts: {
    CURRENCY_A?: TokenAmount
    CURRENCY_B?: TokenAmount
  }
  atMaxAmounts: {
    CURRENCY_A?: TokenAmount
    CURRENCY_B?: TokenAmount
  }
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  handleCurrencyASelect: (currA: Currency) => void
  onFieldBInput: (typedValue: string) => void
  handleCurrencyBSelect: (currB: Currency) => void
}

export const AddLiqudityInputs: FC<Props> = memo(
  ({
    formattedAmounts,
    onFieldAInput,
    maxAmounts,
    atMaxAmounts,
    handleCurrencyASelect,
    currencies,
    onFieldBInput,
    handleCurrencyBSelect,
  }) => {
    const { t } = useTranslation()

    // Use local inputs, but formattedAmounts recalculate and give wrong values
    const [inputs, setInputs] = useState({
      a: '',
      b: '',
    })

    const updateInputs = (a: string, b: string) => {
      setInputs({ a, b })
    }
    // clear when you start type (this unblock your typing)
    const clearInputs = () => {
      updateInputs('', '')
    }

    // const updateFormattedInputs = (a: string, b: string) => {
    //   onFieldAInput(a)
    //   onFieldBInput(b)
    // }

    const onSwitchTokens = () => {
      // handleCurrencyASelect(currencies[Field.CURRENCY_B])
      // handleCurrencyBSelect(currencies[Field.CURRENCY_A])
      // // reverts
      // if (inputs.a && inputs.b) {
      //   updateFormattedInputs(inputs.b, inputs.a)
      //   updateInputs(inputs.b, inputs.a)
      // } else {
      //   updateFormattedInputs(formattedAmounts[Field.CURRENCY_B], formattedAmounts[Field.CURRENCY_A])
      //   updateInputs(formattedAmounts[Field.CURRENCY_B], formattedAmounts[Field.CURRENCY_A])
      // }
    }

    const onInputA = (value: string) => {
      onFieldAInput(value)
      clearInputs()
    }

    const onInputB = (value: string) => {
      onFieldBInput(value)
      clearInputs()
    }

    return (
      <>
        <CurrencyInputPanel
          checkMax
          label={t('From')}
          value={inputs.a || formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onInputA}
          onMax={() => {
            onInputA(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
          }}
          onCurrencySelect={handleCurrencyASelect}
          showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
          currency={currencies[Field.CURRENCY_A]}
          id='add-liquidity-input-tokena'
          showCommonBases={false}
        />
        <ColumnCenter>
          <StyledAddIcon
            onClick={() => {
              onSwitchTokens()
            }}
          >
            <LiqudityIcon />
          </StyledAddIcon>
        </ColumnCenter>
        <CurrencyInputPanel
          checkMax
          label={t('To (estimated)')}
          value={inputs.b || formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onInputB}
          onCurrencySelect={handleCurrencyBSelect}
          onMax={() => {
            onInputB(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
          }}
          showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
          currency={currencies[Field.CURRENCY_B]}
          id='add-liquidity-input-tokenb'
          showCommonBases={false}
        />
      </>
    )
  },
)

// styles

const StyledAddIcon = styled.div`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  justify-content: center;
  padding: 4px;
  border-radius: 12px;
  background: #fff;
  transition: 0.4s;

  svg {
    outline: none;
  }
`
