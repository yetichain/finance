import { Currency, currencyEquals, Pair, Percent, WETH } from '@alium-official/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { splitSignature } from '@ethersproject/bytes'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { AddIcon, Button, Flex, Text } from 'alium-uikit/src'
import { AutoColumn, ColumnCenter } from 'components/Column'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AddRemoveTabs } from 'components/NavigationTabs'
import { MinimalPositionCard } from 'components/PositionCard'
import { RowBetween, RowFixed } from 'components/Row'
import { StyledInternalLink } from 'components/Shared'
import { Dots } from 'components/swap/styleds'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { usePairContract } from 'hooks/useContract'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { ArrowDown, ChevronDown } from 'react-feather'
import { Trans, useTranslation } from 'react-i18next'
import { ROUTES } from 'routes'
import { Field } from 'state/burn/actions'
import { useBurnActionHandlers, useBurnState, useDerivedBurnInfo } from 'state/burn/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { usePairRemove, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasMargin, calculateGasPrice, calculateSlippageAmount, getRouterContract } from 'utils'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { currencyId } from 'utils/currencyId'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import SwapAppBody from 'views/Swap/SwapAppBody'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import CurrencyLogo from '../../components/CurrencyLogo'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import Slider from '../../components/Slider'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import useDebouncedChangeHandler from '../../utils/useDebouncedChangeHandler'
import { ClickableText, Wrapper } from '../Pool/styleds'
import PairLoader from './PairLoader'

const OutlineCard = styled.div`
  padding: 17px 24px;
  background-color: #f5f7ff;
`

const Body = styled.div`
  // padding-left: 24px;
  // padding-right: 24px;
`

const StyledAddIcon = styled.div`
  border: 1.5px solid #6c5dd3;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;
  margin-left: 20px;

  > * {
    margin: auto;
  }
`

const StyledTextAddIcon = styled.div`
  border: 1.5px solid #6c5dd3;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;
  margin: 10px 0;

  > * {
    margin: auto;
  }
`

const Receive = styled(StyledInternalLink)`
  min-width: 94px;
  height: 24px;
  background: #e6e6f6;
  border-radius: 6px;
  padding: 7px;

  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 1px;
  color: #6c5dd3;
  margin-top: 16px;
`

const StyledWrapper = styled(Wrapper)`
  margin-top: 0;
`

const StyledPriceContainer = styled.div`
  background-color: #f4f5fa;
  border-radius: 6px;
  padding: 6px 8px;
`

export const RemoveLiquidity: FC = () => {
  const { t } = useTranslation()
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)
  const { nativeCurrency } = currentNetwork.providerParams
  const history = useRouter()
  const { query } = history
  const currencyIdA = query?.tokens as string
  const currencyIdB = query?.currencyIdB as string

  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { account, chainId, library } = useActiveWeb3React()
  const [tokenA, tokenB] = useMemo(
    () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
    [currencyA, currencyB, chainId],
  )

  // const theme = useContext(ThemeContext)

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showDetailed, setShowDetailed] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('')
  const [txAmount, setTxAmount] = useState<string>()
  const [deadline] = useUserDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  // error
  const [hasError, setError] = useState(false)

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : toSignificantCurrency(parsedAmounts[Field.LIQUIDITY]) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : toSignificantCurrency(parsedAmounts[Field.CURRENCY_A]) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : toSignificantCurrency(parsedAmounts[Field.CURRENCY_B]) ?? '',
  }

  const atMaxAmount = parsedAmounts[Field.LIQUIDITY_PERCENT]?.equalTo(new Percent('1'))

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], currentNetwork.address.router)

  const onAttemptToApprove = async () => {
    if (!pairContract || !pair || !library) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')
    // try to gather a signature for permission
    const nonce = await pairContract.nonces(account)

    const deadlineForSignature: number = Math.ceil(Date.now() / 1000) + deadline

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: 'YETI LPs',
      version: '1',
      chainId,
      verifyingContract: pair.liquidityToken.address,
    }
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ]
    const message = {
      owner: account,
      spender: currentNetwork.address.router,
      value: liquidityAmount.raw.toString(),
      nonce: nonce.toHexString(),
      deadline: deadlineForSignature,
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    })

    library
      .send('eth_signTypedData_v4', [account, data])
      .then(splitSignature)
      .then((signature) => {
        setSignatureData({
          v: signature.v,
          r: signature.r,
          s: signature.s,
          deadline: deadlineForSignature,
        })
      })
      .catch((e) => {
        // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
        if (e?.code !== 4001) {
          approveCallback()
        }
      })
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, val: string) => {
      setSignatureData(null)
      return _onUserInput(field, val)
    },
    [_onUserInput],
  )

  const onLiquidityInput = useCallback((val: string): void => onUserInput(Field.LIQUIDITY, val), [onUserInput])
  const onCurrencyAInput = useCallback((val: string): void => onUserInput(Field.CURRENCY_A, val), [onUserInput])
  const onCurrencyBInput = useCallback((val: string): void => onUserInput(Field.CURRENCY_B, val), [onUserInput])

  // tx sending
  const addTransaction = useTransactionAdder()
  // Clear Pair
  const pairRemove = usePairRemove()
  const onClear = () => {
    pairRemove(pair)
  }

  const onRemove = async () => {
    if (!chainId || !library || !account) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }
    const router = getRouterContract(chainId, library, account)

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB === nativeCurrency
    const oneCurrencyIsETH = currencyA === nativeCurrency || currencyBIsETH
    const deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[]
    let args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadlineFromNow,
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadlineFromNow,
        ]
      }
    }
    // we have a signataure, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }
    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName, index) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((e) => {
            console.error(`estimateGas failed`, index, methodName, args, e)
            return undefined
          }),
      ),
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      const gasPrice = await calculateGasPrice(router.provider)

      try {
        setAttemptingTxn(true)
        const response: TransactionResponse = await router[methodName](...args, {
          gasLimit: safeGasEstimate,
          gasPrice,
        })
        if (innerLiquidityPercentage === 100) {
          onClear()
        }
        addTransaction(response, {
          summary: t('Remove {{currencyA}} {{currencyASymbol}} and {{currencyB}} {{currencyBSymbol}}', {
            currencyA: parsedAmounts[Field.CURRENCY_A]?.toSignificant(3),
            currencyASymbol: currencyA?.symbol,
            currencyB: parsedAmounts[Field.CURRENCY_B]?.toSignificant(3),
            currencyBSymbol: currencyB?.symbol,
          }),
        })

        setTxAmount(amount)
        setTxHash(response.hash)
        await response.wait()
      } catch (e) {
        // we only care if the error is something _other_ than the user rejected the tx
        setError(true)
        console.error(e)
      } finally {
        setAttemptingTxn(false)
      }
    }
  }

  const modalHeader = () => {
    return (
      <AutoColumn gap='md' style={{ marginTop: '0' }}>
        <RowBetween
          style={{ backgroundColor: '#F5F7FF', borderRadius: '6px', padding: '13px 16px' }}
          alignItems='center'
        >
          <Text fontSize='14px'>{toSignificantCurrency(parsedAmounts[Field.CURRENCY_A])}</Text>
          <RowFixed gap='4px'>
            <CurrencyLogo currency={currencyA} size='24px' />
            <Text fontSize='14px' style={{ marginLeft: '10px' }}>
              {currencyA?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowFixed>
          <StyledAddIcon>
            <AddIcon color='#6C5DD3' width='12px' />
          </StyledAddIcon>
        </RowFixed>
        <RowBetween
          style={{ backgroundColor: '#F5F7FF', borderRadius: '6px', padding: '13px 16px' }}
          alignItems='center'
        >
          <Text fontSize='14px'>{toSignificantCurrency(parsedAmounts[Field.CURRENCY_B])}</Text>
          <RowFixed gap='4px'>
            <CurrencyLogo currency={currencyB} size='24px' />
            <Text fontSize='14px' style={{ marginLeft: '10px' }}>
              {currencyB?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>

        <Text fontSize='14px' color='#8990A5'>
          <Trans
            i18nKey='Output is estimated. If the price changes by more than <t>{{percent}}</t>% your transaction will revert.'
            values={{
              percent: allowedSlippage / 100,
            }}
            components={{ t: <Text style={{ display: 'inline-block' }} fontSize='14px' color='#6C5DD3' /> }}
          />
        </Text>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <>
        <RowBetween style={{ padding: '6px 8px' }}>
          <Text color='#8990A5' fontSize='11px'>
            {t('{{aSymbol}}/{{bSymbol}} Burned', {
              aSymbol: currencyA?.symbol,
              bSymbol: currencyB?.symbol,
            })}
          </Text>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin size={24} />
            <Text fontSize='11px' ml='8px'>
              {toSignificantCurrency(parsedAmounts[Field.LIQUIDITY])}
            </Text>
          </RowFixed>
        </RowBetween>
        {pair && (
          <StyledPriceContainer>
            <RowBetween>
              <Text color='#8990A5' fontSize='11px'>
                {t('Price')}
              </Text>
              <Text fontSize='11px' color='#6C5DD3'>
                1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
              </Text>
            </RowBetween>
            <RowBetween>
              <div />
              <Text fontSize='11px' color='#6C5DD3'>
                1 {currencyB?.symbol} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
              </Text>
            </RowBetween>
          </StyledPriceContainer>
        )}
        <Button
          disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)}
          onClick={onRemove}
          fullwidth
          style={{ marginBottom: '24px' }}
        >
          {t('Confirm')}
        </Button>
      </>
    )
  }

  const pendingText = t('Removing {{currencyA}} {{currencyASymbol}} and {{currencyB}} {{currencyBSymbol}}', {
    currencyA: toSignificantCurrency(parsedAmounts[Field.CURRENCY_A]),
    currencyASymbol: currencyA?.symbol,
    currencyB: toSignificantCurrency(parsedAmounts[Field.CURRENCY_B]),
    currencyBSymbol: currencyB?.symbol,
  })

  // for transaction modal success
  const amount = `${toSignificantCurrency(parsedAmounts[Field.CURRENCY_A])} ${
    currencyA?.symbol
  } - ${toSignificantCurrency(parsedAmounts[Field.CURRENCY_B])} ${currencyB?.symbol}`

  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
    },
    [onUserInput],
  )

  const oneCurrencyIsETH = currencyA === nativeCurrency || currencyB === nativeCurrency
  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(WETH[chainId], currencyA)) ||
        (currencyB && currencyEquals(WETH[chainId], currencyB))),
  )

  const handleSelectCurrencyA = useCallback(
    (currency: Currency) => {
      if (currencyIdB && currencyId(currency) === currencyIdB) {
        history.push(ROUTES.removeByMultiple(currencyId(currency), currencyIdA))
      } else {
        history.push(ROUTES.removeByMultiple(currencyId(currency), currencyIdB))
      }
    },
    [currencyIdA, currencyIdB, history],
  )
  const handleSelectCurrencyB = useCallback(
    (currency: Currency) => {
      if (currencyIdA && currencyId(currency) === currencyIdA) {
        history.push(ROUTES.removeByMultiple(currencyIdB, currencyId(currency)))
      } else {
        history.push(ROUTES.removeByMultiple(currencyIdA, currencyId(currency)))
      }
    },
    [currencyIdA, currencyIdB, history],
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    setError(false)
    setSignatureData(null) // important that we clear signature data to avoid bad sigs
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
    }
    setTxHash('')
    setTxAmount(undefined)
  }, [onUserInput, txHash])

  const onRepeat = () => {
    handleDismissConfirmation()
    setShowConfirm(true)
  }

  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0), 10),
    liquidityPercentChangeCallback,
  )

  return (
    <>
      <TransactionConfirmationModal
        hasError={hasError}
        amount={txAmount}
        isOpen={showConfirm}
        onRepeat={onRepeat}
        onDismiss={handleDismissConfirmation}
        attemptingTxn={attemptingTxn}
        hash={txHash || ''}
        content={
          <ConfirmationModalContent
            title={t('You will receive')}
            onDismiss={handleDismissConfirmation}
            topContent={modalHeader}
            bottomContent={modalBottom}
          />
        }
        pendingText={pendingText}
      />
      <SwapAppBody>
        <AddRemoveTabs adding={false} />

        <StyledWrapper>
          <PairLoader pair={pair}>
            <AutoColumn>
              <Body>
                <OutlineCard>
                  <AutoColumn gap='8px'>
                    <RowBetween>
                      <Text
                        style={{
                          color: '#8990A5',
                          fontWeight: 500,
                          letterSpacing: '0.3px',
                          fontSize: '16px',
                        }}
                      >
                        {t('Amount')}
                      </Text>
                      <ClickableText
                        onClick={() => {
                          setShowDetailed(!showDetailed)
                        }}
                        style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px' }}
                      >
                        <Flex alignItems='center'>
                          {showDetailed ? t('Simple') : t('Detailed')}
                          <ChevronDown width='16px' height='16px' />
                        </Flex>
                      </ClickableText>
                    </RowBetween>
                    <Flex justifyContent='start'>
                      <Text
                        fontSize='40px'
                        style={{
                          color: '#0B1359',
                          fontWeight: 700,
                          letterSpacing: '0.3px',
                          lineHeight: '1',
                        }}
                      >
                        {formattedAmounts[Field.LIQUIDITY_PERCENT]}%
                      </Text>
                    </Flex>
                    {!showDetailed && (
                      <>
                        <Flex>
                          <Slider value={innerLiquidityPercentage} onChange={setInnerLiquidityPercentage} />
                        </Flex>
                        <Flex justifyContent='space-between'>
                          <Button
                            variant='tertiary'
                            size='sm'
                            onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '0')}
                            style={{
                              height: '24px',
                              width: '37px',
                              fontSize: '10px',
                              fontWeight: 'bold',
                            }}
                          >
                            0%
                          </Button>
                          <Button
                            variant='tertiary'
                            size='sm'
                            onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')}
                            style={{
                              height: '24px',
                              width: '37px',
                              fontSize: '10px',
                              fontWeight: 'bold',
                            }}
                          >
                            25%
                          </Button>
                          <Button
                            variant='tertiary'
                            size='sm'
                            onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')}
                            style={{
                              height: '24px',
                              width: '37px',
                              fontSize: '10px',
                              fontWeight: 'bold',
                            }}
                          >
                            50%
                          </Button>
                          <Button
                            variant='tertiary'
                            size='sm'
                            onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')}
                            style={{
                              height: '24px',
                              width: '37px',
                              fontSize: '10px',
                              fontWeight: 'bold',
                            }}
                          >
                            75%
                          </Button>
                          <Button
                            variant='tertiary'
                            size='sm'
                            onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                            style={{
                              height: '24px',
                              minWidth: '37px',
                              fontSize: '10px',
                              fontWeight: 'bold',
                            }}
                          >
                            {t('Max')}
                          </Button>
                        </Flex>
                      </>
                    )}
                  </AutoColumn>
                </OutlineCard>
              </Body>
              {!showDetailed && (
                <>
                  <ColumnCenter>
                    <StyledTextAddIcon>
                      <ArrowDown size='12' color='#6C5DD3' />
                    </StyledTextAddIcon>
                  </ColumnCenter>
                  <Body>
                    <OutlineCard style={{ background: 'none', padding: '0 24px' }}>
                      <AutoColumn>
                        <RowBetween style={{ padding: '10px 16px' }}>
                          <Text fontSize='14px' style={{ fontWeight: 500 }}>
                            {formattedAmounts[Field.CURRENCY_A] || '-'}
                          </Text>
                          <RowFixed>
                            <CurrencyLogo currency={currencyA} style={{ marginRight: '12px' }} />
                            <Text fontSize='14px' id='remove-liquidity-tokena-symbol' style={{ fontWeight: 500 }}>
                              {currencyA?.symbol}
                            </Text>
                          </RowFixed>
                        </RowBetween>
                        <RowBetween
                          style={{
                            backgroundColor: '#F4F5FA',
                            padding: '10px 16px',
                            borderRadius: '6px',
                          }}
                        >
                          <Text fontSize='14px' style={{ fontWeight: 500 }}>
                            {formattedAmounts[Field.CURRENCY_B] || '-'}
                          </Text>
                          <RowFixed>
                            <CurrencyLogo currency={currencyB} style={{ marginRight: '12px' }} />
                            <Text fontSize='14px' id='remove-liquidity-tokenb-symbol' style={{ fontWeight: 500 }}>
                              {currencyB?.symbol}
                            </Text>
                          </RowFixed>
                        </RowBetween>
                        {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? (
                          <RowBetween style={{ justifyContent: 'flex-end' }}>
                            {oneCurrencyIsETH ? (
                              <Receive
                                href={ROUTES.removeByMultiple(
                                  currencyA === nativeCurrency ? WETH[chainId].address : currencyIdA,
                                  currencyB === nativeCurrency ? WETH[chainId].address : currencyIdB,
                                )}
                              >
                                {t('Receive WBNB')}
                              </Receive>
                            ) : oneCurrencyIsWETH ? (
                              <Receive
                                href={ROUTES.removeByMultiple(
                                  currencyA && currencyEquals(currencyA, WETH[chainId]) ? 'ETH' : currencyIdA,
                                  currencyB && currencyEquals(currencyB, WETH[chainId]) ? 'ETH' : currencyIdB,
                                )}
                              >
                                {t('Receive BNB')}
                              </Receive>
                            ) : null}
                          </RowBetween>
                        ) : null}
                      </AutoColumn>
                    </OutlineCard>
                  </Body>
                </>
              )}
              <Body style={{ padding: '24px' }}>
                <Detailed
                  showDetailed={showDetailed}
                  formattedAmounts={formattedAmounts}
                  onLiquidityInput={onLiquidityInput}
                  onUserInput={onUserInput}
                  atMaxAmount={atMaxAmount}
                  pair={pair}
                  currencyA={currencyA}
                  handleSelectCurrencyA={handleSelectCurrencyA}
                  onCurrencyBInput={onCurrencyBInput}
                  onCurrencyAInput={onCurrencyAInput}
                  currencyB={currencyB}
                  handleSelectCurrencyB={handleSelectCurrencyB}
                />

                {pair && (
                  <div style={{ padding: '32px 0' }}>
                    <Flex justifyContent='space-between' mb='8px'>
                      <Text style={{ color: '#8990A5', fontSize: '14px', fontWeight: 500 }}>{t('Price')}:</Text>
                      <Text style={{ color: '#0B1359', fontSize: '14px', fontWeight: 500 }}>
                        1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'}{' '}
                        {currencyB?.symbol}
                      </Text>
                    </Flex>
                    <Flex justifyContent='space-between'>
                      <div />
                      <Text style={{ color: '#0B1359', fontSize: '14px', fontWeight: 500 }}>
                        1 {currencyB?.symbol} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'}{' '}
                        {currencyA?.symbol}
                      </Text>
                    </Flex>
                  </div>
                )}
                <div style={{ position: 'relative' }}>
                  {!account ? (
                    <ConnectWalletButton fullwidth />
                  ) : (
                    <RowBetween>
                      <Button
                        onClick={onAttemptToApprove}
                        variant={approval === ApprovalState.APPROVED || signatureData !== null ? 'success' : 'primary'}
                        disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                        mr='8px'
                      >
                        {approval === ApprovalState.PENDING ? (
                          <Dots>Approving</Dots>
                        ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                          t('Approved')
                        ) : (
                          t('Approve')
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowConfirm(true)
                        }}
                        disabled={!isValid || (signatureData === null && approval !== ApprovalState.APPROVED)}
                        variant={
                          !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                            ? 'danger'
                            : 'primary'
                        }
                      >
                        {error || t('Remove')}
                      </Button>
                    </RowBetween>
                  )}
                </div>
              </Body>
            </AutoColumn>
          </PairLoader>
        </StyledWrapper>
      </SwapAppBody>

      {pair ? (
        <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
        </AutoColumn>
      ) : null}
    </>
  )
}

interface DetailedProps {
  showDetailed: boolean
  formattedAmounts: {
    LIQUIDITY_PERCENT: string
    LIQUIDITY: string
    CURRENCY_A: string
    CURRENCY_B: string
  }
  onLiquidityInput: (val: string) => void
  onUserInput: (field: Field, val: string) => void
  atMaxAmount: boolean
  pair: Pair
  onCurrencyAInput: (val: string) => void
  currencyA: Currency
  handleSelectCurrencyA: (currency: Currency) => void
  onCurrencyBInput: (val: string) => void
  currencyB: Currency
  handleSelectCurrencyB: (currency: Currency) => void
}
const Detailed: FC<DetailedProps> = React.memo(
  ({
    showDetailed,
    formattedAmounts,
    onLiquidityInput,
    onUserInput,
    atMaxAmount,
    pair,
    currencyA,
    handleSelectCurrencyA,
    onCurrencyBInput,
    onCurrencyAInput,
    currencyB,
    handleSelectCurrencyB,
  }) => {
    const { t } = useTranslation()
    return (
      <>
        {showDetailed && (
          <>
            <CurrencyInputPanel
              value={formattedAmounts[Field.LIQUIDITY]}
              onUserInput={onLiquidityInput}
              onMax={() => {
                onUserInput(Field.LIQUIDITY_PERCENT, '100')
              }}
              showMaxButton={!atMaxAmount}
              disableCurrencySelect
              currency={pair?.liquidityToken}
              pair={pair}
              label={t('From')}
              id='liquidity-amount'
              customHeight={43}
              key='liquidity-amount'
            />
            <ColumnCenter>
              <StyledTextAddIcon>
                <ArrowDown size='12' color='#6C5DD3' />
              </StyledTextAddIcon>
            </ColumnCenter>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onCurrencyAInput}
              onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
              showMaxButton={!atMaxAmount}
              currency={currencyA}
              label={t('Output')}
              onCurrencySelect={handleSelectCurrencyA}
              id='remove-liquidity-tokena'
              customHeight={43}
            />
            <ColumnCenter>
              <StyledTextAddIcon>
                <AddIcon color='#6C5DD3' width='12px' />
              </StyledTextAddIcon>
            </ColumnCenter>
            <CurrencyInputPanel
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onCurrencyBInput}
              onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
              showMaxButton={!atMaxAmount}
              currency={currencyB}
              label={t('Output')}
              onCurrencySelect={handleSelectCurrencyB}
              id='remove-liquidity-tokenb'
              customHeight={43}
            />
          </>
        )}
      </>
    )
  },
)
