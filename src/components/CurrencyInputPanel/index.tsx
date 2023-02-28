import { Currency, Pair } from '@alium-official/sdk'
import { ArrowDropDownIcon, Button, Text } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { darken } from 'polished'
import React, { useCallback, useState } from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled, { keyframes, useTheme } from 'styled-components'
import { getCurrencyBalance } from 'utils/currency/getCurrencyBalance'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { TranslateString } from 'utils/translateTextHelpers'
import { FarmPair } from 'views/farms/farms.types'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { Input as NumericalInput } from '../NumericalInput'
import { RowBetween } from '../Row'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { ReactComponent as WarningIcon } from './assets/Warning.svg'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  checkMax?: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  pair?: Pair | FarmPair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  currencyList?: any
  customHeight?: number
  // extends props for farm input
  balance?: string
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  checkMax,
  label = TranslateString(132, 'Input'),
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  currencyList,
  customHeight,
  balance,
}: CurrencyInputPanelProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  const showMax = (account && currency) || showMaxButton
  const currencyBalance = new BigNumber(getCurrencyBalance(selectedCurrencyBalance))
  const curInputValue = new BigNumber(value)
  const checkOnMax = checkMax && curInputValue.gt(currencyBalance)

  return (
    <>
      <InputPanel id={id} checkOnMax={checkOnMax}>
        <Container hideInput={hideInput}>
          {!hideInput && (
            <LabelRow>
              <RowBetween>
                <Text fontSize='14px' style={{ color: '#6C5DD3' }}>
                  {label}
                </Text>
                {account && (
                  <Text
                    onClick={onMax}
                    fontSize='14px'
                    style={{ display: 'inline', cursor: 'pointer', color: '#6C5DD3' }}
                  >
                    {(!!currency && selectedCurrencyBalance) || balance ? (
                      t('Balance {{balance}}', { balance: balance || toSignificantCurrency(selectedCurrencyBalance) })
                    ) : (
                      <Dots>{t('Balance loading')}</Dots>
                    )}
                  </Text>
                )}
              </RowBetween>
            </LabelRow>
          )}
          <InputRow
            style={hideInput ? { padding: '0', borderRadius: '8px' } : {}}
            selected={disableCurrencySelect}
            customHeight={customHeight}
          >
            {!hideInput && (
              <>
                <NumericalInput
                  className='token-amount-input'
                  value={value}
                  onUserInput={(val) => {
                    onUserInput(val)
                  }}
                  style={{ fontSize: '14px' }}
                />
                {showMax && (
                  <Button onClick={onMax} size='sm' variant='text' buttonType='max'>
                    {t('MAX')}
                  </Button>
                )}
              </>
            )}
            <CurrencySelect
              selected={!!currency}
              className='open-currency-select-button'
              onClick={() => {
                if (!disableCurrencySelect) {
                  setModalOpen(true)
                }
              }}
            >
              <Aligner>
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size='24px' style={{ marginRight: '8px' }} />
                ) : null}
                {pair ? (
                  <Text
                    color={theme.colors.textSubtle}
                    style={{ marginLeft: '8px', fontSize: '14px' }}
                    className='symbol-title'
                  >
                    {(pair as FarmPair)?.pairName
                      ? (pair as FarmPair)?.pairName
                      : `${pair?.token0.symbol}:${pair?.token1.symbol}`}
                  </Text>
                ) : (
                  <Text color={theme.colors.textSubtle} style={{ paddingRight: '12px', fontSize: '14px' }}>
                    {(currency?.symbol && currency.symbol.length > 20
                      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                          currency.symbol.length - 5,
                          currency.symbol.length,
                        )}`
                      : currency?.symbol) || (
                      <Text color={theme.colors.textSubtle} style={{ fontSize: '14px' }}>
                        {t('Select a token')}
                      </Text>
                    )}
                  </Text>
                )}
                {!disableCurrencySelect && <ArrowDropDownIcon />}
              </Aligner>
            </CurrencySelect>
          </InputRow>
        </Container>
        {!disableCurrencySelect && onCurrencySelect && (
          <CurrencySearchModal
            isOpen={modalOpen}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            selectedCurrency={currency}
            otherSelectedCurrency={otherCurrency}
            showCommonBases={showCommonBases}
            currencyList={currencyList}
          />
        )}
      </InputPanel>
      <MaxWarningBlock checkOnMax={checkOnMax}>
        <WarningIcon />
        <MaxWarningBlockText>{t('Insufficient funds')}</MaxWarningBlockText>
      </MaxWarningBlock>
    </>
  )
}

// styles

const InputRow = styled.div<{ selected: boolean; customHeight?: number }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.4rem 0.5rem 0.4rem 1rem' : '0.4rem 0.75rem 0.4rem 1rem')};
  ${({ customHeight }) => (customHeight ? `height: ${customHeight}px;` : '')}
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 8px 0 10px;
  position: relative;
`

const LabelRow = styled.div`
  width: 100%;
  position: absolute;
  padding: 4px 0.75rem;
  top: -17px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  & ${Text} {
    background: #fff;
    padding: 4px;
    font-size: 13px;
    line-height: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primaryBright};
  }
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ checkOnMax: boolean }>`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  border: ${({ checkOnMax }) => (checkOnMax ? '1px solid #FFA100' : '1px solid #d2d6e5')};
  position: relative;
  border-radius: 6px;
  background-color: transparent;
  z-index: 1;

  &:focus-within {
    border-color: #6c5dd3;
  }
`

const MaxWarningBlock = styled.div<{ checkOnMax: boolean }>`
  margin-top: 3px;
  display: ${({ checkOnMax }) => (checkOnMax ? 'flex' : 'none')};
  align-items: center;
`

const MaxWarningBlockText = styled.div`
  margin-left: 4px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #ffa100;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 6px;
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const dots = keyframes`
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
`

const Dots = styled.div`
  &:after {
    content: '...';
    animation: ${dots} 1s steps(5, end) infinite;
  }
`
