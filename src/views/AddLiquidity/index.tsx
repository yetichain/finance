/* eslint-disable react-hooks/exhaustive-deps */
import { Currency, currencyEquals, TokenAmount, WETH } from '@alium-official/sdk'
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { CardBody } from 'alium-uikit/src'
import { CardNav } from 'components/CardNav'
import { AutoColumn } from 'components/Column'
import { AddRemoveTabs } from 'components/NavigationTabs'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { useActiveWeb3React } from 'hooks'
import { usePairUpdater } from 'hooks/liqudity/usePairUpdater'
import { useCurrency } from 'hooks/Tokens'
import { useLiquidityPriorityDefaultAlm } from 'hooks/useAlm'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { i18n } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ROUTES } from 'routes'
import { Field } from 'state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useIsExpertMode, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasMargin, calculateGasPrice, calculateSlippageAmount, getRouterContract } from 'utils'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { currencyId } from 'utils/currencyId'
import GTM from 'utils/gtm'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import SwapAppBody from 'views/Swap/SwapAppBody'
import { Wrapper } from '../Pool/styleds'
import { AddLiqudityInputs } from './AddLiqudityInputs'
import { AddLiqudityModalContent } from './AddLiqudityModalContent'
import { AddLiquditySupply } from './AddLiquditySupply'
import { InvalidPair, InvalidPairCurrencies } from './InvalidPair'
import { NoLiquidity } from './NoLiquidity'

const CardWrapper = styled.div`
  width: 100%;
`

interface props {
  currencyIdA?: string
  currencyIdB?: string
}

const AddLiquidity: FC<props> = memo(({ currencyIdA, currencyIdB }) => {
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)
  const { nativeCurrency } = currentNetwork.providerParams
  useLiquidityPriorityDefaultAlm()

  const history = useRouter()
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  const { account, chainId, library } = useActiveWeb3React()
  const user = useMemo(() => account, [account])

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId]))),
  )
  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const [deadline] = useUserDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')
  const [hasError, setError] = useState(false)
  // const { t } = useTranslation()

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : toSignificantCurrency(parsedAmounts[dependentField], '0.0') ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )
  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    currentNetwork.address.router,
  )
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    currentNetwork.address.router,
  )

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmittedA, setApprovalSubmittedA] = useState<boolean>(false)
  const [approvalSubmittedB, setApprovalSubmittedB] = useState<boolean>(false)
  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalA === ApprovalState.PENDING) {
      setApprovalSubmittedA(true)
    } else {
      setApprovalSubmittedA(false)
    }
  }, [approvalA, approvalSubmittedA])

  useEffect(() => {
    if (approvalB === ApprovalState.PENDING) {
      setApprovalSubmittedB(true)
    } else {
      setApprovalSubmittedB(false)
    }
  }, [approvalB, approvalSubmittedB])

  const addTransaction = useTransactionAdder()
  const sendDataToGTM = useGTMDispatch()

  // Pair updater
  const tokensPair = pair && {
    addressA: pair?.token0?.address,
    addressB: pair?.token1?.address,
  }
  usePairUpdater(tokensPair, pair)

  const onAdd = async () => {
    if (!chainId || !library || !user) return
    const router = getRouterContract(chainId, library, user)

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts

    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    const deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline

    let estimate
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | number>
    let value: BigNumber | null
    if (currencyA === nativeCurrency || currencyB === nativeCurrency) {
      const tokenBIsETH = currencyB === nativeCurrency
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        user,
        deadlineFromNow,
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        user,
        deadlineFromNow,
      ]
      value = null
    }
    const gasPrice = await calculateGasPrice(router.provider)
    try {
      setAttemptingTxn(true)
      const estimatedGasLimit = await estimate(...args, value ? { value } : {})
      const response = await method(...args, {
        ...(value ? { value } : {}),
        gasLimit: calculateGasMargin(estimatedGasLimit),
        gasPrice,
      })
      GTM.addLiquidity(sendDataToGTM, { formattedAmounts, currencies })
      addTransaction(response, {
        summary: i18n.t('Add {{val1}} {{val2}} and {{val3}} {{val4}}', {
          val1: parsedAmounts[Field.CURRENCY_A]?.toSignificant(3),
          val2: currencies[Field.CURRENCY_A]?.symbol,
          val3: parsedAmounts[Field.CURRENCY_B]?.toSignificant(3),
          val4: currencies[Field.CURRENCY_B]?.symbol,
        }),
      })
      setTxHash(response.hash)
      await response.wait()
    } catch (e) {
      const isLowPrice = e?.data?.message === 'execution reverted: ds-math-sub-underflow'
      if (isLowPrice) {
        setError(true)
      }
      console.error('-----Error when adding liqudity-----', e)
      // we only care if the error is something _other_ than the user rejected the tx
      if (e?.code !== 4001) {
        console.error(e)
      }
      setError(true)
    } finally {
      setAttemptingTxn(false)
    }
  }

  const pendingText = `Supplying ${toSignificantCurrency(parsedAmounts[Field.CURRENCY_A])} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${toSignificantCurrency(parsedAmounts[Field.CURRENCY_B])} ${currencies[Field.CURRENCY_B]?.symbol}`

  const amount = `${toSignificantCurrency(parsedAmounts[Field.CURRENCY_A])} ${
    currencies[Field.CURRENCY_A]?.symbol
  } - ${toSignificantCurrency(parsedAmounts[Field.CURRENCY_B])} ${currencies[Field.CURRENCY_B]?.symbol}`

  const handleCurrencyASelect = useCallback(
    (currA: Currency) => {
      setApprovalSubmittedA(false)
      const newCurrencyIdA = currencyId(currA)
      if (newCurrencyIdA === currencyIdB) {
        history.push(ROUTES.addByMultiple(currencyIdB, currencyIdA))
      } else {
        history.push(ROUTES.addByMultiple(newCurrencyIdA, currencyIdB))
      }
    },
    [currencyIdB, history, currencyIdA],
  )

  const handleCurrencyBSelect = useCallback(
    (currB: Currency) => {
      setApprovalSubmittedB(false)
      const newCurrencyIdB = currencyId(currB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(ROUTES.addByMultiple(currencyIdB, newCurrencyIdB))
        } else {
          history.push(ROUTES.addByOne(newCurrencyIdB))
        }
      } else {
        history.push(ROUTES.addByMultiple(currencyIdA || 'ETH', newCurrencyIdB))
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    setError(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const onRepeat = () => {
    handleDismissConfirmation()
    setShowConfirm(true)
  }

  const modalContent = useMemo(() => {
    return (
      <AddLiqudityModalContent
        noLiquidity={noLiquidity}
        handleDismissConfirmation={() => {
          handleDismissConfirmation()
        }}
        currencies={currencies}
        liquidityMinted={liquidityMinted}
        allowedSlippage={allowedSlippage}
        price={price}
        parsedAmounts={parsedAmounts}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }, [
    allowedSlippage,
    currencies,
    handleDismissConfirmation,
    hasError,
    liquidityMinted,
    noLiquidity,
    onAdd,
    parsedAmounts,
    poolTokenPercentage,
    price,
  ])

  return (
    <CardWrapper>
      <CardNav activeIndex={1} />
      <SwapAppBody>
        <AddRemoveTabs adding />
        <Wrapper>
          <TransactionConfirmationModal
            hasError={hasError}
            onRepeat={onRepeat}
            amount={amount}
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            content={modalContent}
            pendingText={pendingText}
          />
          <CardBody>
            <AutoColumn gap='20px'>
              {noLiquidity && <NoLiquidity />}
              <AddLiqudityInputs
                formattedAmounts={formattedAmounts}
                onFieldAInput={onFieldAInput}
                maxAmounts={maxAmounts}
                atMaxAmounts={atMaxAmounts}
                handleCurrencyASelect={handleCurrencyASelect}
                currencies={currencies}
                onFieldBInput={onFieldBInput}
                handleCurrencyBSelect={handleCurrencyBSelect}
              />
              <InvalidPairCurrencies
                currencies={currencies}
                pairState={pairState}
                noLiquidity={noLiquidity}
                poolTokenPercentage={poolTokenPercentage}
                price={price}
              />
              <AddLiquditySupply
                user={user}
                approvalA={approvalA}
                approvalB={approvalB}
                isValid={isValid}
                expertMode={expertMode}
                currencies={currencies}
                approveACallback={approveACallback}
                approvalSubmittedA={approvalSubmittedA}
                approveBCallback={approveBCallback}
                approvalSubmittedB={approvalSubmittedB}
                setShowConfirm={setShowConfirm}
                parsedAmounts={parsedAmounts}
                onAdd={onAdd}
                error={error}
              />
            </AutoColumn>
          </CardBody>
        </Wrapper>
      </SwapAppBody>

      <InvalidPair pair={pair} noLiquidity={noLiquidity} pairState={pairState} oneCurrencyIsWETH={oneCurrencyIsWETH} />
    </CardWrapper>
  )
})

export default AddLiquidity
