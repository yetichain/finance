import { parseUnits } from '@ethersproject/units'
import { Skeleton } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { useBridgeContext } from 'contexts/BridgeContext'
import { BigNumber as EthersBigNumber, utils } from 'ethers'
import useAlmPrice from 'hooks/useAlmPrice'
import { ExchangeIcon } from 'images/Exchange-icon'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo } from 'react'
import { storeBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { formatBridgeTokenAmount } from 'utils/bridge/helpers'
import { isRebasingToken } from 'utils/bridge/rebasingTokens'
import AdvancedInput from '../AdvancedInput'
import BridgeApproveBtn from '../BridgeApproveBtn'
import { BridgeTransferButton } from '../BridgeTransferButton'
import { useDelay } from '../FromToken'
import BridgeCurrencyInput from './BridgeCurrencyInput'

const Skeletons = () => {
  return (
    <div>
      <div className='left-column'>
        <div className='input'>
          <SkeletonInput />
          <SkeletonBtn />
        </div>
        <div>
          <SkeletonAdvanced />
        </div>
      </div>
    </div>
  )
}

// 1500000 ALM
const maxAmountEther = '1500000'
// 1 USD
const validatorFeeUsd = '1'

const BridgeInput = () => {
  const { t } = useTranslation()
  const toggleModal = storeBridge.getState().toggleModal
  const toggleNetworks = storeBridge.getState().toggleNetworks
  const { tokensDetailLoader } = useBridgeContext()
  const almPrice = useAlmPrice()

  const {
    fromToken: token,
    setAmount,
    toAmountLoading,
    allowed,
    fromBalance: balance,
    amountInput: input,
    toAmount,
    fromAmount,
    setAmountInput: setInput,
    approve,
    unlockLoading,
  } = useBridgeContext()

  const tokenBalance = balance

  const updateAmount = useCallback(() => {
    setAmount(input)
  }, [input, setAmount])

  const delayedSetAmount = useDelay(updateAmount, 500)

  const transfer = () => {
    toggleModal(true)
  }

  const onMax = () => {
    const balance = formatBridgeTokenAmount(token, tokenBalance)
    setInput(balance)
    setAmount(balance)
  }

  // validate receiver
  const { receiver } = useBridgeContext()
  const valid = React.useMemo(() => (receiver?.length ? utils.isAddress(receiver) : true), [receiver])

  const isInsufficientFunds = fromAmount.gt(tokenBalance)

  const minAmountEther = useMemo<string>(() => {
    // TODO: crutch for the validator fee: 1$ / YET Price * 100%
    return almPrice ? new BigNumber(validatorFeeUsd).div(almPrice).times(100).toFixed(0) : ''
  }, [almPrice])

  const warning = useMemo(() => {
    if (fromAmount.gt(parseUnits(maxAmountEther))) {
      return t('Maximum Amount Per Transaction - {{value}} {{symbol}}', { value: maxAmountEther, symbol: 'ALM' })
    }

    if (fromAmount.gt(0) && fromAmount.lt(parseUnits(minAmountEther))) {
      return t('Minimum Amount Per Transaction - {{value}} {{symbol}}', { value: minAmountEther, symbol: 'ALM' })
    }

    if (isInsufficientFunds) {
      return t('Insufficient funds')
    }
  }, [fromAmount, isInsufficientFunds, minAmountEther, t])

  const disableBtn =
    toAmount <= EthersBigNumber.from(0) ||
    fromAmount <= EthersBigNumber.from(0) ||
    Boolean(Number(input) <= 0) ||
    tokensDetailLoader ||
    toAmountLoading ||
    !valid ||
    !minAmountEther ||
    !!warning

  const isRebaseToken = isRebasingToken(token)
  const disabledApprove = allowed || isRebaseToken || toAmountLoading || isInsufficientFunds

  return (
    <InputWrapper>
      {tokensDetailLoader ? (
        <Skeletons />
      ) : (
        <div className='left-column'>
          <div className='input'>
            <BridgeCurrencyInput
              id='bridge-input'
              showMaxButton={true}
              onUserInput={setInput}
              value={input}
              onMax={onMax}
              currency={token}
              disableCurrencySelect
              onKeyUp={delayedSetAmount}
              loading={tokensDetailLoader}
              warning={warning}
            />
            {disabledApprove ? (
              <BridgeTransferButton onClick={transfer} desktop disabled={disableBtn}>
                {t('Transfer')}
              </BridgeTransferButton>
            ) : (
              <BridgeApproveBtn
                amount={fromAmount}
                balance={balance}
                approve={approve}
                buttonDisabled={disabledApprove}
                unlockLoading={unlockLoading || !valid}
                desktop
              />
            )}
          </div>

          <AdvancedInput>
            {disabledApprove ? (
              <BridgeTransferButton onClick={transfer} mobile disabled={disableBtn}>
                {t('Transfer')}
              </BridgeTransferButton>
            ) : (
              <BridgeApproveBtn
                amount={fromAmount}
                balance={balance}
                approve={approve}
                buttonDisabled={disabledApprove}
                unlockLoading={unlockLoading || !valid}
                mobile
              />
            )}
          </AdvancedInput>
        </div>
      )}
      <div className='right-column'>
        <SwitchIcon onClick={toggleNetworks}>
          <ExchangeIcon />
        </SwitchIcon>
      </div>
    </InputWrapper>
  )
}

export default BridgeInput

// styles

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .input {
    display: flex;

    @media screen and (max-width: 480px) {
      flex-direction: column;
    }
  }

  .right-column {
    display: flex;
    align-items: center;
  }

  .left-column {
    width: 100%;

    @media screen and (max-width: 480px) {
      padding-right: 16px;
    }
  }
`

const SwitchIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  box-shadow: 0 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 40px;
  transition: 0.4s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};

    & svg path {
      stroke: #fff;
    }
  }
`

const StyledSkeleton = styled(Skeleton)`
  padding: 0;
  margin: 0;
  height: auto;
`

const SkeletonInput = styled(StyledSkeleton)`
  width: 340px;
  height: 48px;
  margin-right: 16px;

  @media screen and (max-width: 768px) {
    width: 240px;
    height: 24px;
  }

  @media screen and (max-width: 480px) {
    width: 140px;
    height: 24px;
  }
`

const SkeletonBtn = styled(StyledSkeleton)`
  width: 109px;
  height: 48px;

  @media screen and (max-width: 768px) {
    width: 59px;
    height: 24px;
  }
`

const SkeletonAdvanced = styled(StyledSkeleton)`
  width: 96px;
  height: 20px;
  margin-top: 8px;
`
