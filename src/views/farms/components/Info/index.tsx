import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { useWeb3React } from '@web3-react/core'
import { AddIcon, Button, CalculateIcon, IconButton, LinkIcon, MinusIcon, Skeleton, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import QuestionHelper from 'components/QuestionHelper'
import { BIG_ZERO } from 'config'
import { useTokenContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled, { css } from 'styled-components'
import { breakpoints, mq } from 'ui'
import { getExplorerLink } from 'utils'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import GTM from 'utils/gtm'
import DepositModal from 'views/farms/components/Modals/DepositModal'
import { FarmWithStakedValue, ViewMode } from 'views/farms/farms.types'
import useApproveFarm from 'views/farms/hooks/useApproveFarm'
import { useFarmsLoading, useLpTokenPrice, usePriceAlmBusd } from 'views/farms/hooks/useFarmingPools'
import useHarvestFarm from 'views/farms/hooks/useHarvestFarm'
import useStakeFarms from 'views/farms/hooks/useStakeFarms'
import useUnstakeFarms from 'views/farms/hooks/useUnstakeFarms'
import RoiModal from '../Modals/RoiModal'
import WithdrawModal from '../Modals/WithdrawModal'
import { BuyTicketBtn } from '../TicketBanner/BuyTicketBtn'

const StyledConnectBtn = styled(ConnectWalletButton)`
  max-width: 300px;
  width: auto !important;
`

export const InfoRow = styled.div<{ withBg?: boolean }>`
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  ${(props) => props.withBg && 'background: #f4f5fa;'}
`

export const InfoTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #8990a5;

  & > a {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
    border-bottom: 1px solid #6c5dd3;
    padding-bottom: 4px;
  }
`

export const EarnsFarm = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  word-break: break-all;
  .balance {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 10px;
    letter-spacing: 1px;
    color: #8990a5;
    margin-left: 4px;
  }
`

export const InfoValue = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #0b1359;
`

const ColoredPrice = styled.div<{ color: 'textDisabled' | 'text' }>`
  color: ${({ color }) => (color === 'textDisabled' ? '#8990a5' : '#6c5dd3')};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
`

const StakeCounter = styled(IconButton)<{ viewMode: ViewMode }>`
  background: #6c5dd3;

  &:hover {
    opacity: 0.75;
  }

  svg {
    path {
      stroke: #fff;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${({ viewMode }) =>
      viewMode === ViewMode.TABLE &&
      `
      height: 28px;
      width: 28px;
    `}
  }
`

const HarvestButton = styled(Button)`
  width: 81px;
  height: 32px;
  font-size: 12px;
`

export interface InfoAPRProps {
  isFinished?: boolean
  farm: FarmWithStakedValue
  almPrice: BigNumber
}

const AprItem = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`
const IconCalculateWrap = styled.div<{ $isFinished?: boolean }>`
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
export function InfoApr({ isFinished, farm, almPrice }: InfoAPRProps) {
  const { t } = useTranslation()
  const loading = useFarmsLoading()
  const [onShowRoi] = useModal(<RoiModal almPrice={almPrice} farm={farm} />)
  return (
    <>
      <InfoTitle>
        {t('APR')}
        <InfoApr.Question
          text={t(
            'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
          )}
        />
      </InfoTitle>
      <InfoValue>
        <AprItem>
          {!loading ? (
            <>
              <IconCalculateWrap $isFinished={isFinished} onClick={!isFinished ? onShowRoi : () => {}}>
                <CalculateIcon />
              </IconCalculateWrap>
              {farm.apr || 0}%
            </>
          ) : (
            <Skeleton width='75px' />
          )}
        </AprItem>
      </InfoValue>
    </>
  )
}

InfoApr.Question = styled(QuestionHelper)`
  vertical-align: middle;
`

export interface InfoEarnProps {
  farm: FarmWithStakedValue
}

export function InfoEarn({ farm }: InfoEarnProps) {
  const { t } = useTranslation()
  return (
    <>
      <InfoTitle> {t('earn')}</InfoTitle>
      <InfoValue>{farm.dual ? farm.dual.earnLabel : t('YET + Fees')}</InfoValue>
    </>
  )
}

export function useFarmLpLabel(farm: FarmWithStakedValue) {
  return farm.lpSymbol?.toUpperCase().replace('PANCAKE', '')
}

export function useFarmEarnings(farm: FarmWithStakedValue) {
  const { earnings: earningsAsString = 0 } = farm.userData || {}
  return new BigNumber(earningsAsString)
}

export type InfoEarnedElement = ReturnType<typeof useInfoEarned>
export function useInfoEarned(farm: FarmWithStakedValue) {
  const { t } = useTranslation()
  const earnings = useFarmEarnings(farm)
  const { account } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(farm.pid)
  const { toastSuccess, toastError } = useToast()
  const almPrice = usePriceAlmBusd()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)

  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(almPrice).toNumber() : 0

  const loading = useFarmsLoading()

  return {
    earnings,
    rawEarningsBalance,
    displayBalance,
    earningsBusd,
    titleNode: t('YET earned'),
    displayBalanceNode: loading ? (
      <Skeleton width='50px' />
    ) : (
      <ColoredPrice color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</ColoredPrice>
    ),
    earningsBusdNode:
      earningsBusd > 0 ? (
        <Balance before='~' fontSize='12px' color='textSubtle' decimals={2} value={earningsBusd} unit=' USD' />
      ) : null,
    harvestButtonNode: (
      <HarvestButton
        disabled={rawEarningsBalance.eq(0) || pendingTx || loading}
        variant='secondary'
        onClick={async () => {
          setPendingTx(true)
          try {
            await onReward()
            toastSuccess(`${t('Harvested')}!`, t('Your YET earnings have been sent to your wallet!'))
          } catch (e) {
            toastError(
              t('Error'),
              t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
            )
            console.error(e)
          } finally {
            setPendingTx(false)
          }
        }}
      >
        {t('harvest')}
      </HarvestButton>
    ),
  }
}

export interface InfoDepositProps {
  farm: FarmWithStakedValue
}
const LpLink = styled(InfoValue)`
  a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  svg {
    margin-left: 8px;
  }
`

export function InfoDeposit({ farm }: InfoDepositProps) {
  const { t } = useTranslation()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const address = getExplorerLink(currentChainId, farm.lpAddresses[currentChainId], 'address')
  return (
    <>
      <InfoTitle>{t('Deposit')}:</InfoTitle>
      <LpLink>
        <a href={address} target='_blank'>
          {useFarmLpLabel(farm)} <LinkIcon />
        </a>
      </LpLink>
    </>
  )
}

export function InfoDepositFee({ depositFee }: { depositFee: number }) {
  const { t } = useTranslation()
  const loading = useFarmsLoading()
  return (
    <>
      <InfoTitle>{t('Deposit fee')}</InfoTitle>
      <InfoValue>{!loading ? `${depositFee || 0}%` : <Skeleton width={75} height={25} />}</InfoValue>
    </>
  )
}

export function InfoLpType() {
  const { t } = useTranslation()
  return (
    <>
      <InfoTitle>{t('LP Type')}</InfoTitle>
      <InfoValue>YETI LP</InfoValue>
    </>
  )
}

export function useFarmLpAddress(farm: FarmWithStakedValue) {
  return getAddress(farm.lpAddresses)
}

export interface InfoViewBscScanProps {
  farm: FarmWithStakedValue
}

export function InfoViewBscScan({ farm }: InfoViewBscScanProps) {
  const { t } = useTranslation()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const address = useFarmLpAddress(farm)
  const loading = useFarmsLoading()
  if (loading) {
    return <Skeleton width={75} height={25} />
  }
  return (
    <InfoTitle>
      <a href={getExplorerLink(currentChainId, address, 'address')} target='_blank' style={{ whiteSpace: 'nowrap' }}>
        {t('View on {{explorerName}}', { explorerName: 'BscScan' })}
      </a>
    </InfoTitle>
  )
}

export interface InfoTotalLiquidityProps {
  farm: FarmWithStakedValue
}

export function InfoTotalLiquidity({ farm }: InfoTotalLiquidityProps) {
  const { t } = useTranslation()
  const loading = useFarmsLoading()

  const totalLiqudidty = farm.liqudity + '$'
  return (
    <>
      <InfoTitle>{t('Total Liquidity')}</InfoTitle>
      <InfoValue>{!loading ? <p>{totalLiqudidty}</p> : <Skeleton width={75} height={25} />}</InfoValue>
    </>
  )
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

export interface UseInfoStakedParams {
  farm: FarmWithStakedValue
}

export function useInfoStaked({ farm }: UseInfoStakedParams) {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const gtmDispatch = useGTMDispatch()
  const { account } = useWeb3React()
  const loading = useFarmsLoading()
  const viewMode = useStoreFarms((state) => state.viewMode)

  const {
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    allowance: allowanceAsString = 0,
  } = farm.userData || {}

  const pid = farm.pid
  const tokenName = farm.lpSymbol
  const apr = farm.apr
  const { lpAddresses } = farm
  const allowance = new BigNumber(allowanceAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const tokenBalance = new BigNumber(tokenBalanceAsString)

  // hooks
  const lpContract = useTokenContract(lpAddress)
  const { onApprove } = useApproveFarm(lpContract)
  const stakedBalance = useMemo(() => new BigNumber(stakedBalanceAsString), [stakedBalanceAsString])
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useRouter()
  const hasTicket = useStoreFarms((state) => state.hasTicket)
  // TODO provide lp price here
  const lpPrice = useLpTokenPrice(tokenName)
  const almPrice = usePriceAlmBusd()

  const stakedBalanceNotZero = account ? !stakedBalance.eq(0) : false

  // conditions
  const FARM_NOT_ENABLED = account && !isApproved
  const STAKE_ALLOW = isApproved && !stakedBalanceNotZero
  const TICKET_NOT_BUYED = !hasTicket
  const EMPTY_STAKE_ACTION = !TICKET_NOT_BUYED && !FARM_NOT_ENABLED && !STAKE_ALLOW

  // handlers
  const handleStake = async (amount: string) => {
    await onStake(amount)
    GTM.stakeFarms(gtmDispatch, farm, amount)
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={handleStake}
      tokenName={tokenName}
      apr={apr}
      farm={farm}
      almPrice={almPrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal farm={farm} max={stakedBalance} onConfirm={handleUnstake} tokenName={tokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()

      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account, pid])

  const displayBalance = useCallback(() => {
    if (FARM_NOT_ENABLED || TICKET_NOT_BUYED) {
      return ''
    }
    if (!account) {
      return '0.000'
    }
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return '<0.0000001'
    }
    if (stakedBalanceBigNumber.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN)
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [FARM_NOT_ENABLED, TICKET_NOT_BUYED, account, stakedBalance])

  const stakedInBusd = getBalanceNumber(lpPrice.times(stakedBalance))

  return {
    titleNode: t('{{tokenName}} Staked', { tokenName }),
    displayBalanceNode:
      FARM_NOT_ENABLED || TICKET_NOT_BUYED ? null : loading ? (
        <Skeleton width='50px' />
      ) : (
        <ColoredPrice color='text'>{displayBalance()}</ColoredPrice>
      ),
    balanceNode: !loading && account && stakedBalance.gt(0) && lpPrice.gt(0) && (
      <Balance before='~' fontSize='12px' color='textSubtle' decimals={2} value={stakedInBusd} unit=' USD' />
    ),
    stakedBalanceNotZero,
    stakingButtonsNode:
      !loading && account && stakedBalanceNotZero ? (
        <IconButtonWrapper>
          <StakeCounter size='sm' variant='tertiary' onClick={onPresentWithdraw} mr='6px' viewMode={viewMode}>
            <MinusIcon />
          </StakeCounter>
          <StakeCounter
            size='sm'
            viewMode={viewMode}
            variant='tertiary'
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            <AddIcon.Small />
          </StakeCounter>
        </IconButtonWrapper>
      ) : (
        <div>-</div>
      ),
    actionsNode: !account ? (
      <StyledConnectBtn title={t('Connect Wallet')} />
    ) : EMPTY_STAKE_ACTION ? null : (
      <>
        {TICKET_NOT_BUYED ? (
          <BuyTicketBtn />
        ) : (
          FARM_NOT_ENABLED && (
            <Button mt='8px' disabled={requestedApproval || loading} onClick={handleApprove}>
              {t('Enable Farm')}
            </Button>
          )
        )}
        {STAKE_ALLOW && (
          <Button
            onClick={onPresentDeposit}
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            {t('Stake LP')}
          </Button>
        )}
      </>
    ),
    onPresentDeposit,
  }
}
