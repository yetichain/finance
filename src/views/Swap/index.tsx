import { CurrencyAmount, JSBI, Token, Trade } from '@alium-official/sdk'
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { Button, CardBody, Flex, Text } from 'alium-uikit/src'
import AddressInputPanel from 'components/AddressInputPanel'
import Card, { GreyCard } from 'components/Card'
import { CardNav } from 'components/CardNav'
import { AutoColumn } from 'components/Column'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import Loader from 'components/Loaders/Loader'
import PageHeader from 'components/PageHeader'
import ProgressSteps from 'components/ProgressSteps'
import { AutoRow, RowBetween } from 'components/Row'
import { LinkStyledButton, TYPE } from 'components/Shared'
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import confirmPriceImpactWithoutFee from 'components/swap/confirmPriceImpactWithoutFee'
import ConfirmSwapModal from 'components/swap/ConfirmSwapModal'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import TradePrice from 'components/swap/TradePrice'
import TokenWarningModal from 'components/TokenWarningModal'
import { INITIAL_ALLOWED_SLIPPAGE } from 'config/settings'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { ExchangeIcon } from 'images/Exchange-icon'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowDown } from 'react-feather'
import { Field } from 'state/swap/actions'
import { useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useExpertModeManager, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import styled, { ThemeContext } from 'styled-components'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import GTM from 'utils/gtm'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import { useExchangeInputsRedirect } from 'utils/redirects/swap/SwapRedirects'
import SwapAppBody from './SwapAppBody'

const { main: Main } = TYPE

const Swap = () => {
  const loadedUrlParams = useExchangeInputsRedirect()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext) as any

  const [isExpertMode] = useExpertModeManager()

  const { t } = useTranslation()

  // get custom settings values for user
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const derivedSwapInfo = useDerivedSwapInfo()

  const {
    v2Trade,
    currencyBalances,
    inputAmount,
    outputAmount,
    currencies,
    inputError: swapInputError,
  } = derivedSwapInfo

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  //   const { address: recipientAddress } = useENSAddress(recipient)
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: inputAmount,
        [Field.OUTPUT]: outputAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? inputAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? outputAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : toSignificantCurrency(parsedAmounts[dependentField], '0.0') ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const maxAmountOutput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.OUTPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))
  const atMaxAmountOutput = Boolean(maxAmountOutput && parsedAmounts[Field.OUTPUT]?.equalTo(maxAmountOutput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    deadline,
    recipient,
  )

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const sendDataToGTM = useGTMDispatch()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
      .then((hash) => {
        GTM.swap(sendDataToGTM, trade)
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: hash,
        }))
      })
      .catch((error) => {
        setSwapState((prevState) => ({
          ...prevState,
          attemptingTxn: false,
          swapErrorMessage: error.message,
          txHash: undefined,
        }))
      })
  }, [priceImpactWithoutFee, swapCallback, sendDataToGTM, trade])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false }))

    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash, setSwapState])

  const handleShow = () => {
    setSwapState({
      tradeToConfirm: trade,
      attemptingTxn: false,
      swapErrorMessage: undefined,
      showConfirm: true,
      txHash: undefined,
    })
  }

  const handleOnRepeat = () => {
    handleConfirmDismiss()
    handleShow()
  }

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection, setApprovalSubmitted],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleMaxOutput = useCallback(() => {
    if (maxAmountOutput) {
      onUserInput(Field.OUTPUT, maxAmountOutput.toExact())
    }
  }, [maxAmountOutput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
    },
    [onCurrencySelection],
  )

  return (
    <CardWrapper>
      <TokenWarningModal
        isOpen={urlLoadedTokens.length > 0 && !dismissTokenWarning}
        tokens={urlLoadedTokens}
        onConfirm={handleConfirmTokenWarning}
      />
      <CardNav />
      <SwapAppBody>
        <Wrapper id='swap-page'>
          <ConfirmSwapModal
            isOpen={showConfirm}
            trade={trade}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
            onRepeat={handleOnRepeat}
          />
          <PageHeader
            title={t('Exchange')}
            description={t('Trade tokens in an instant')}
            settingsModalTitle={t('New - Settings')}
          />
          <StyledCardBody>
            <CardBody>
              <AutoColumn>
                <CurrencyInputPanel
                  checkMax
                  label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
                  value={formattedAmounts[Field.INPUT]}
                  onMax={handleMaxInput}
                  showMaxButton={!atMaxAmountInput}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  id='swap-currency-output'
                />
                <AutoColumn justify='space-between'>
                  <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                    <ArrowWrapper clickable style={{ padding: '0' }}>
                      <StyledIconButton
                        onClick={() => {
                          setApprovalSubmitted(false) // reset 2 step UI for approvals
                          onSwitchTokens()
                        }}
                      >
                        <ExchangeIcon />
                      </StyledIconButton>
                    </ArrowWrapper>
                    {recipient === null && !showWrap && isExpertMode ? (
                      <LinkStyledButton id='add-recipient-button' onClick={() => onChangeRecipient('')}>
                        {t('+ Add a send (optional)')}
                      </LinkStyledButton>
                    ) : null}
                  </AutoRow>
                </AutoColumn>
                <CurrencyInputPanel
                  value={formattedAmounts[Field.OUTPUT]}
                  onMax={handleMaxOutput}
                  onUserInput={handleTypeOutput}
                  label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
                  showMaxButton={!atMaxAmountOutput}
                  currency={currencies[Field.OUTPUT]}
                  onCurrencySelect={handleOutputSelect}
                  otherCurrency={currencies[Field.INPUT]}
                  id='swap-currency-output'
                />

                {recipient !== null && !showWrap ? (
                  <>
                    <AutoRow justify='space-between' style={{ padding: '0 1rem' }}>
                      <ArrowWrapper clickable={false}>
                        <ArrowDown size='16' color={theme.colors.textSubtle} />
                      </ArrowWrapper>
                      <LinkStyledButton id='remove-recipient-button' onClick={() => onChangeRecipient(null)}>
                        {t('- Remove send')}
                      </LinkStyledButton>
                    </AutoRow>
                    <AddressInputPanel id='recipient' value={recipient} onChange={onChangeRecipient} />
                  </>
                ) : null}

                {!showWrap && (!!trade || allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE) ? (
                  <Card padding='16px 0 8px 0' borderRadius='20px'>
                    <AutoColumn gap='8px'>
                      {!!trade && (
                        <AutoRow align='center'>
                          <Text fontSize='14px' paddingRight='8px' color='#8990A5'>
                            {t('Price')}
                          </Text>
                          <TradePrice
                            price={trade?.executionPrice}
                            showInverted={showInverted}
                            setShowInverted={setShowInverted}
                          />
                        </AutoRow>
                      )}
                      {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                        <Flex alignItems='center' justifyContent='flex-start'>
                          <Text fontSize='14px' color={theme.colors.basic}>
                            {t('Slippage Tolerance')}
                          </Text>
                          <Text fontSize='14px' style={{ marginLeft: 10, color: '#6C5DD3' }}>
                            {allowedSlippage / 100}%
                          </Text>
                        </Flex>
                      )}
                    </AutoColumn>
                  </Card>
                ) : null}
              </AutoColumn>

              <BottomGrouping>
                {!account ? (
                  <ConnectWalletButton />
                ) : showWrap ? (
                  <Button disabled={Boolean(wrapInputError)} onClick={onWrap}>
                    {wrapInputError ??
                      (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
                  </Button>
                ) : noRoute && userHasSpecifiedInputOutput ? (
                  <GreyCard style={{ textAlign: 'center' }}>
                    <Main>{t('Insufficient liquidity for this trade.')}</Main>
                  </GreyCard>
                ) : showApproveFlow ? (
                  <StyledRowBetween>
                    <Button
                      onClick={approveCallback}
                      disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                      style={{ width: '48%' }}
                      variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
                    >
                      {approval === ApprovalState.PENDING ? (
                        <AutoRow gap='6px' justify='center'>
                          {t('Approving')} <Loader stroke='white' />
                        </AutoRow>
                      ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                        t('Approved')
                      ) : (
                        t('Approve {{currencySymbol}}', { currencySymbol: currencies[Field.INPUT]?.symbol })
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        if (isExpertMode) {
                          handleSwap()
                        } else {
                          handleShow()
                        }
                      }}
                      style={{ width: '48%' }}
                      id='swap-button'
                      disabled={
                        !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                      }
                      variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primary'}
                    >
                      {priceImpactSeverity > 3 && !isExpertMode
                        ? t('Price Impact High')
                        : t('Swap {{stringValue}}', { stringValue: priceImpactSeverity > 2 ? ' Anyway' : '' })}
                    </Button>
                  </StyledRowBetween>
                ) : (
                  <Button
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    id='swap-button'
                    disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                    variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
                  >
                    {t('Swap Anyway')}
                  </Button>
                )}
                {showApproveFlow && <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />}
                {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
              </BottomGrouping>
            </CardBody>
          </StyledCardBody>
        </Wrapper>
      </SwapAppBody>
      <AdvancedSwapDetailsDropdown trade={trade} />
    </CardWrapper>
  )
}

export default Swap

// styles

const CardWrapper = styled.div`
  width: 100%;
`

const StyledIconButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
  padding: 6px;
  border-radius: 12px;
  background: #fff;
  transition: 0.4s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};

    & svg path {
      stroke: #fff;
    }
  }
`

const StyledCardBody = styled.div`
  & > div {
    padding: 40px 24px 24px 24px;
  }

  @media screen and (max-width: 376px) {
    & > div {
      padding: 36px 16px 16px 16px;
    }
  }
`

const StyledRowBetween = styled(RowBetween)`
  @media screen and (max-width: 530px) {
    flex-direction: column;

    & > button {
      width: 100% !important;

      &:first-child {
        margin-bottom: 8px;
      }
    }
  }
`
