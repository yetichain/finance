import { Button, CalculateIcon, LinkIcon, Modal, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled, { css } from 'styled-components'
import { getExplorerLink } from 'utils'
import { roiCalculator } from 'utils/farm/compoundApyHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useFarmLpAddress } from 'views/farms/components/Info'
import { FarmPair, FarmTab, FarmWithStakedValue } from 'views/farms/farms.types'
import { useLpTokenPrice } from 'views/farms/hooks/useFarmingPools'
import { FarmModalStatuses } from './FarmModalStatuses'
import { ModalFarmBaseWrap } from './modals.styled'
import RoiModal from './RoiModal'

const MILLION = 1000000

export interface FarmActionModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  farm: FarmWithStakedValue
  title: string
  onDismiss?: () => void
  tokenName?: string
  apr?: number
  almPrice?: BigNumber
  withoutRoi?: boolean
  type: 'stake' | 'unstake'
}

const FarmActionModal = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
  title,
  withoutRoi,
  type,
}: FarmActionModalProps) => {
  const { t } = useTranslation()
  const [state, setState] = useState({
    roiDayPercentage: 0,
    roiDayBusd: 0,
  })

  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, seterror] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const activeTab = useStoreFarms((state) => state.activeTab)
  const isFinished = FarmTab.finished === activeTab

  // roi
  const lpPrice = useLpTokenPrice(farm?.lpSymbol)
  const { apr, farmLpBalance } = farm

  const pair: FarmPair = {
    token0: farm.token,
    token1: farm.quoteToken,
    pairName: tokenName,
  }
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const link = getExplorerLink(currentChainId, useFarmLpAddress(farm), 'address')

  // display roi
  const roiUsdFormatted = state.roiDayBusd.toLocaleString('en', {
    minimumFractionDigits: state.roiDayBusd > MILLION ? 0 : 2,
    maximumFractionDigits: state.roiDayBusd > MILLION ? 0 : 2,
  })
  // roi end

  // inputs

  const roiCalc = useCallback(
    (userShareCount: number) => {
      const res = roiCalculator(apr, farmLpBalance, userShareCount, Number(lpPrice))
      setState(res)
    },
    [apr, farmLpBalance, lpPrice],
  )

  const handleChange = useCallback(
    (value: string) => {
      setVal(value)
      roiCalc(Number(value))
    },
    [roiCalc],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
    roiCalc(Number(fullBalance))
  }, [fullBalance, roiCalc])

  // transaction actions
  const confirm = async () => {
    try {
      setPendingTx(true)
      await onConfirm(val)
      setSuccess(true)
    } catch (error) {
      seterror(true)
    } finally {
      setPendingTx(false)
    }
  }
  const onRepeat = async () => {
    seterror(false)
    await confirm()
  }

  const [onShowRoi] = useModal(<RoiModal almPrice={almPrice} farm={farm} />)

  const wrongAmount = !val || Number(val) <= 0 || Number(val) > Number(fullBalance)
  const lockBtn = pendingTx || wrongAmount

  return (
    <Modal title={title} onDismiss={onDismiss} withoutContentWrapper>
      <FarmModalStatuses loading={pendingTx} success={success} error={error} type={type} onRepeat={onRepeat}>
        <FarmActionModal.ModalWrapper>
          <CurrencyInputPanel
            label={t('Stake')}
            value={val}
            onUserInput={handleChange}
            onMax={handleSelectMax}
            onCurrencySelect={() => {}}
            showMaxButton
            currency={null}
            id='farm-action-input'
            showCommonBases={false}
            balance={fullBalance}
            disableCurrencySelect
            pair={pair}
          />
          {!withoutRoi && (
            <FarmActionModal.Roi>
              <h3> {t('Annual ROI at current rates')}:</h3>
              <div className='price'>
                <p title={roiUsdFormatted}>${roiUsdFormatted}</p>
                <FarmActionModal.IconCalculateWrap
                  $isFinished={isFinished}
                  onClick={!isFinished ? onShowRoi : () => {}}
                >
                  <CalculateIcon />
                </FarmActionModal.IconCalculateWrap>
              </div>
            </FarmActionModal.Roi>
          )}
          <FarmActionModal.ModalActions>
            <Button fullwidth variant='secondary' onClick={onDismiss}>
              {t('Cancel')}
            </Button>
            <Button fullwidth disabled={lockBtn} onClick={confirm}>
              {pendingTx ? t('Pending Confirmation') : t('Confirm')}
            </Button>
          </FarmActionModal.ModalActions>
          <FarmActionModal.ModalFooter>
            <a className='link' href={link} target='_blank'>
              <h3>{t('Get {{tokenName}}', { tokenName })}</h3>
              <LinkIcon />
            </a>
          </FarmActionModal.ModalFooter>
        </FarmActionModal.ModalWrapper>
      </FarmModalStatuses>
    </Modal>
  )
}

FarmActionModal.ModalWrapper = styled(ModalFarmBaseWrap)`
  /* min-height: 224px; */
  padding: 24px;

  .symbol-title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #6c5dd3;
  }
`

FarmActionModal.Roi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  .price {
    display: flex;
    align-items: center;
    p {
      display: block;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.3px;
      color: #0b1359;
    }

    svg {
      margin-left: 10px;
    }
  }
`

FarmActionModal.ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  button {
    &:first-child {
      margin-right: 16px;
    }
  }
`

FarmActionModal.ModalFooter = styled.div`
  padding: 24px 24px 0px 24px;
  border-top: 1px solid #f4f5fa;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .link {
    display: flex;
    cursor: pointer;
    h3 {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #6c5dd3;
    }
    svg {
      margin-left: 8px;
    }
  }
`

FarmActionModal.IconCalculateWrap = styled.div<{ $isFinished?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  ${({ $isFinished }) =>
    $isFinished &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`

export default FarmActionModal
