import { Percent } from '@alium-official/sdk'
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { Button, InjectedModalProps, Modal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import { useToast } from 'state/hooks'
import styled from 'styled-components'
import { mq, breakpoints } from 'ui'
import { ethersToBN, toEther, toWei } from 'utils/bigNumber'
import GTM from 'utils/gtm'
import {
  useApprove,
  useCurrentPoolId,
  useLock,
  useParticipantNumber,
  usePoolLocked,
  usePoolUsers,
  useRewardTokenAllowance,
  useRewardTokenBalance,
  useRewardTokenInfo,
  useRewardTokenSymbol,
  useTotalLocked,
} from 'views/StrongHoldersPool/hooks'
import { formatBigNumber } from 'views/StrongHoldersPool/utils'
import PoolDetailsInfo from '../PoolDetailsInfo'

export type JoinPoolModalProps = InjectedModalProps

export default function JoinPoolModal({ onDismiss }: JoinPoolModalProps) {
  const { t } = useTranslation()
  const gtmDispatch = useGTMDispatch()
  const { data: currentPoolId, mutate: mutateCurrentPoolId } = useCurrentPoolId()
  const { data: poolLocked, mutate: mutatePoolLocked } = usePoolLocked(currentPoolId)
  const participantNumber = useParticipantNumber(currentPoolId)
  const { mutate: mutatePoolUsers } = usePoolUsers(currentPoolId, {
    revalidateOnMount: false,
  })
  const { mutate: mutateTotalLocked } = useTotalLocked({
    revalidateOnMount: false,
  })
  const { approve, loading: approveLoading } = useApprove()
  const { lock, loading: lockLoading } = useLock()
  const loading = lockLoading || approveLoading
  const rewardTokenInfo = useRewardTokenInfo()
  const rewardTokenSymbol = useRewardTokenSymbol()
  const { data: rewardTokenAllowance, mutate: mutateRewardTokenAllowance } = useRewardTokenAllowance()
  const { data: balanceWei, mutate: mutateBalance } = useRewardTokenBalance()
  const balanceEther = useMemo(() => balanceWei && toEther(ethersToBN(balanceWei)), [balanceWei])
  const [amount, setAmount] = useState('')
  const amountEther = useMemo(() => new BigNumber(amount), [amount])
  const hasAmount = amountEther.gt(0)
  const amountWei = useMemo(() => hasAmount && toWei(amountEther), [amountEther, hasAmount])
  const needApprove = useMemo(
    () => rewardTokenAllowance && amountWei && ethersToBN(rewardTokenAllowance).minus(amountWei).lt(0),
    [amountWei, rewardTokenAllowance],
  )
  const isInsufficientFunds = balanceEther?.lt(amountEther)
  const poolShare = useMemo(
    () =>
      poolLocked && amountWei
        ? new Percent(amountWei.toFixed(0), ethersToBN(poolLocked).plus(amountWei).toFixed(0))
        : new Percent('0'),
    [amountWei, poolLocked],
  )
  const { toastError, toastSuccess } = useToast()
  const protectedSetAmount = useCallback((value: string) => !loading && setAmount(value), [loading])
  const onApprove = useMemo(
    () =>
      approve && !approveLoading && hasAmount && !isInsufficientFunds && needApprove
        ? async () => {
            try {
              await approve()
              await mutateRewardTokenAllowance()
              toastSuccess(t('Approved'))
            } catch (error) {
              console.error(error)
              toastError(error.data?.message || error.message)
            }
          }
        : undefined,
    [
      approve,
      approveLoading,
      hasAmount,
      isInsufficientFunds,
      mutateRewardTokenAllowance,
      needApprove,
      t,
      toastError,
      toastSuccess,
    ],
  )

  const onJoin = useMemo(
    () =>
      !lockLoading && hasAmount && !isInsufficientFunds && !needApprove
        ? async () => {
            try {
              await lock(amountWei)
              GTM.joinShp(gtmDispatch, amountEther.toString())
              toastSuccess(
                t('{{amount}} {{rewardTokenSymbol}} added to the pool', {
                  amount: formatBigNumber(amountEther),
                  rewardTokenSymbol,
                }),
              )

              // refetch data
              mutateBalance()
              mutateRewardTokenAllowance()
              mutateCurrentPoolId()
              mutatePoolUsers()
              mutatePoolLocked()
              mutateTotalLocked()

              onDismiss()
            } catch (error) {
              console.error(error)
              toastError(error.data?.message || error.message)
            }
          }
        : undefined,
    [
      amountEther,
      amountWei,
      gtmDispatch,
      hasAmount,
      isInsufficientFunds,
      lock,
      lockLoading,
      mutateBalance,
      mutateCurrentPoolId,
      mutatePoolLocked,
      mutatePoolUsers,
      mutateRewardTokenAllowance,
      mutateTotalLocked,
      needApprove,
      onDismiss,
      rewardTokenSymbol,
      t,
      toastError,
      toastSuccess,
    ],
  )
  return (
    <>
      <Modal withoutContentWrapper hideCloseButton={loading} title={t('Add YET’s to the pool')} onDismiss={onDismiss}>
        <JoinPoolModal.Content>
          <JoinPoolModal.Data>
            <CurrencyInputPanel
              disableCurrencySelect
              id='join-pool-modal-amount'
              showMaxButton
              value={amount}
              onUserInput={protectedSetAmount}
              balance={balanceEther && formatBigNumber(balanceEther)}
              onMax={() => protectedSetAmount(String(balanceEther || 0))}
              currency={rewardTokenInfo}
              label={t('Amount')}
            />
            <JoinPoolModal.Actions>
              <Button isloading={approveLoading} onClick={onApprove} disabled={!onApprove}>
                {t('Approve')}
              </Button>
              <Button isloading={lockLoading} onClick={onJoin} disabled={!onJoin}>
                {t('Join')}
              </Button>
            </JoinPoolModal.Actions>
          </JoinPoolModal.Data>
          <JoinPoolModal.Details>
            <PoolDetailsInfo poolShare={poolShare} participantNumber={participantNumber} />
          </JoinPoolModal.Details>
        </JoinPoolModal.Content>
      </Modal>
    </>
  )
}

JoinPoolModal.Content = styled.div`
  width: 450px;
  max-width: 100%;

  @media ${mq.down(breakpoints.sm)} {
    width: 354px;
  }
`

JoinPoolModal.Data = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #e9eaeb;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 24px;
  }
`

JoinPoolModal.Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

JoinPoolModal.Details = styled.div`
  padding: 16px;
`
