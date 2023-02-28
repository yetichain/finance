import { Currency, CurrencyAmount } from '@alium-official/sdk'
import { Button } from 'alium-uikit/src'
import { AutoColumn } from 'components/Column'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Loader from 'components/Loaders/Loader'
import { AutoRow, RowBetween } from 'components/Row'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useTranslation } from 'next-i18next'
import { FC, memo, SetStateAction } from 'react'
import { Field } from 'state/mint/actions'
import styled from 'styled-components'

interface Props {
  user: string
  approvalA: ApprovalState
  approvalB: ApprovalState
  isValid: boolean
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  approveACallback: () => Promise<void>
  approvalSubmittedA: boolean
  approveBCallback: () => Promise<void>
  approvalSubmittedB: boolean
  expertMode: boolean
  setShowConfirm: (value: SetStateAction<boolean>) => void
  parsedAmounts: {
    CURRENCY_A?: CurrencyAmount
    CURRENCY_B?: CurrencyAmount
  }
  onAdd: () => Promise<void>
  error: string
}

export const AddLiquditySupply: FC<Props> = memo(
  ({
    user,
    approvalA,
    approvalB,
    isValid,
    expertMode,
    currencies,
    approveACallback,
    approvalSubmittedA,
    approveBCallback,
    approvalSubmittedB,
    setShowConfirm,
    parsedAmounts,
    onAdd,
  }) => {
    const { t } = useTranslation()

    if (!user) {
      return <ConnectWalletButton fullwidth />
    }

    return (
      <AutoColumn gap='md'>
        {(approvalA === ApprovalState.NOT_APPROVED ||
          approvalA === ApprovalState.PENDING ||
          approvalB === ApprovalState.NOT_APPROVED ||
          approvalB === ApprovalState.PENDING) &&
          isValid && (
            <RowBetween>
              {approvalA !== ApprovalState.APPROVED && currencies[Field.CURRENCY_A]?.symbol && (
                <Button
                  onClick={approveACallback}
                  disabled={approvalA !== ApprovalState.NOT_APPROVED || approvalSubmittedA}
                  style={{ width: approvalB !== ApprovalState.APPROVED ? '48%' : '100%' }}
                >
                  {approvalA === ApprovalState.PENDING || approvalSubmittedA ? (
                    <AutoRow gap='6px' justify='center'>
                      {t('Approving')} {currencies[Field.CURRENCY_A]?.symbol} <Loader stroke='white' />
                    </AutoRow>
                  ) : (
                    t('Approve {{currencySymbol}}', { currencySymbol: currencies[Field.CURRENCY_A]?.symbol })
                  )}
                </Button>
              )}
              {approvalB !== ApprovalState.APPROVED && currencies[Field.CURRENCY_B]?.symbol && (
                <Button
                  onClick={approveBCallback}
                  disabled={approvalB !== ApprovalState.NOT_APPROVED || approvalSubmittedB}
                  style={{ width: approvalA !== ApprovalState.APPROVED ? '48%' : '100%' }}
                >
                  {approvalB === ApprovalState.PENDING || approvalSubmittedB ? (
                    <AutoRow gap='6px' justify='center'>
                      {t('Approving')} {currencies[Field.CURRENCY_B]?.symbol} <Loader stroke='white' />
                    </AutoRow>
                  ) : (
                    t('Approve {{currencySymbol}}', { currencySymbol: currencies[Field.CURRENCY_B]?.symbol })
                  )}
                </Button>
              )}
            </RowBetween>
          )}
        <StyledButton
          onClick={() => {
            if (expertMode) {
              onAdd()
            } else {
              setShowConfirm(true)
            }
          }}
          disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
          // disabled={!isValid}
          variant={
            !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B] ? 'danger' : 'primary'
          }
        >
          {t('Supply')}
        </StyledButton>
      </AutoColumn>
    )
  },
)

// styles

const StyledButton = styled(Button)`
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
