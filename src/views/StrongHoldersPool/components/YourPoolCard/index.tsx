import { Button, Skeleton } from 'alium-uikit/src'
import ConnectionLoad from 'alium-uikit/src/components/ConnectionLoad'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useToggle } from 'react-use'
import styled, { css } from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import { ethersToBN, toEther } from 'utils/bigNumber'
import {
  useCountReward,
  useCountRewardProfit,
  useIsFullPool,
  useNftClaim,
  usePool,
  usePoolAccountUser,
  usePoolAmount,
  usePoolUsers,
  usePoolWithdrawPosition,
  useRewardTokenSymbol,
  useWithdraw,
} from 'views/StrongHoldersPool/hooks'
import { isUserPaid } from 'views/StrongHoldersPool/utils'
import BonusNft from '../BonusNft'
import DetailsButton from '../DetailsButton'
import FormattedValue from '../FormattedValue'
import Title from '../Title'
import Details from './Details'
import PickUpFunds from './PickUpFunds'

export interface YourPoolCardProps {
  poolId: ethers.BigNumber
}

export default function YourPoolCard({ poolId }: YourPoolCardProps) {
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToast()
  const [isDetails, toggleDetails] = useToggle(false)
  const { mutate: mutatePool } = usePool(poolId, {
    revalidateOnMount: false,
  })
  const rewardTokenSymbol = useRewardTokenSymbol()
  const { mutate: mutatePoolUsers } = usePoolUsers(poolId, {
    revalidateOnMount: false,
  })
  const poolAmount = usePoolAmount(poolId)
  const { withdraw, loading: withdrawLoading } = useWithdraw()
  const { claim, loading: claimLoading } = useNftClaim()
  const { mutate: mutateCountReward } = useCountReward(poolId, {
    revalidateOnMount: false,
  })
  const { isLoss } = useCountRewardProfit(poolId)
  const accountUser = usePoolAccountUser(poolId)
  const isPaid = accountUser && isUserPaid(accountUser)
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const isFullPool = useIsFullPool(poolId)
  const onLeavePool = useMemo(
    () =>
      isFullPool && !isPaid && !withdrawLoading && !claimLoading && claim
        ? async () => {
            if (!window.confirm(t('Are you sure you want to leave the pool?'))) {
              return
            }
            try {
              // Withdraw YET
              await withdraw(poolId)
              toastSuccess(t('Funds withdrawn!'))

              // Refetch pool data
              mutatePool()
              mutatePoolUsers()
              mutateCountReward()

              // Claim NFT
              if (await claim()) {
                toastSuccess(t('NFT claimed!'))
              }
            } catch (error) {
              console.error(error)
              toastError(error.data?.message || error.message)
            }
          }
        : undefined,
    [
      claim,
      claimLoading,
      isFullPool,
      isPaid,
      mutateCountReward,
      mutatePool,
      mutatePoolUsers,
      poolId,
      t,
      toastError,
      toastSuccess,
      withdraw,
      withdrawLoading,
    ],
  )
  return (
    <>
      <YourPoolCard.Root>
        <YourPoolCard.Summary>
          <YourPoolCard.Info>
            <YourPoolCard.InfoFields>
              <YourPoolCard.Field>
                <Title>{t('Your contribution')}</Title>
                {accountUser ? (
                  <YourPoolCard.Value
                    value={toEther(ethersToBN(accountUser.balance))}
                    tokenSymbol={rewardTokenSymbol}
                  />
                ) : (
                  <Skeleton />
                )}
              </YourPoolCard.Field>
              <YourPoolCard.Field>
                <PickUpFunds poolId={poolId} />
              </YourPoolCard.Field>
              <YourPoolCard.Field>
                <BonusNft poolId={poolId} />
              </YourPoolCard.Field>
            </YourPoolCard.InfoFields>
            <YourPoolCard.InfoActions>
              <Button disabled={!onLeavePool} onClick={onLeavePool}>
                {t('Leave the pool')}
              </Button>
              <DetailsButton isOpen={isDetails} onClick={toggleDetails} />
            </YourPoolCard.InfoActions>
          </YourPoolCard.Info>
          <YourPoolCard.PoolCounters>
            <YourPoolCard.Field>
              <Title>{t('Users In the pool')}</Title>
              {withdrawPosition ? (
                <YourPoolCard.UsersCounter isLoss={isLoss} value={ethersToBN(withdrawPosition)} />
              ) : (
                <Skeleton />
              )}
            </YourPoolCard.Field>
            <YourPoolCard.Field>
              <Title>{t('Pool Amount')}</Title>
              {poolAmount ? (
                <YourPoolCard.Value value={toEther(ethersToBN(poolAmount))} tokenSymbol={rewardTokenSymbol} />
              ) : (
                <Skeleton />
              )}
            </YourPoolCard.Field>
          </YourPoolCard.PoolCounters>
          {isPaid && <YourPoolCard.LeftOverlayCard>{t('You left the pool')}</YourPoolCard.LeftOverlayCard>}
        </YourPoolCard.Summary>
        {isDetails && (
          <YourPoolCard.Details>
            <Details poolId={poolId} />
          </YourPoolCard.Details>
        )}
        {isPaid && <YourPoolCard.LeftOverlay />}
      </YourPoolCard.Root>
      <ConnectionLoad load={withdrawLoading || claimLoading} />
    </>
  )
}

YourPoolCard.LeftOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(210, 214, 229, 0.7);
  pointer-events: none;
`

YourPoolCard.LeftOverlayCard = styled(Card)`
  ${typography.small.medium}
  color: #0b1359;
  padding: 13px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
`

YourPoolCard.Info = styled.div`
  padding-top: 16px;
`

YourPoolCard.Field = styled.div`
  & > ${Title} {
    margin-bottom: 8px;
  }
`

YourPoolCard.InfoFields = styled.div`
  margin-bottom: 32px;
  & > * + * {
    margin-top: 24px;
  }
`

YourPoolCard.InfoActions = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 24px;
  }
`

YourPoolCard.Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`

YourPoolCard.Value = styled(FormattedValue)`
  ${typography.big.medium}

  @media ${mq.down(breakpoints.lg)} {
    ${typography.regular.medium}
  }
`

YourPoolCard.PoolCounters = styled.div`
  display: grid;
  gap: 20px;
  border: 1px solid #f4f5fa;
  border-radius: 6px;
  padding: 16px 24px 16px 16px;
`

YourPoolCard.UsersCounter = styled(YourPoolCard.Value)<{ isLoss?: boolean }>`
  font-weight: bold;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: 0.3px;
  color: #1ea76d;

  ${(props) =>
    props.isLoss &&
    css`
      color: #ff4d00;
    `}
`

YourPoolCard.Details = styled.div`
  padding-top: 32px;
`

YourPoolCard.Root = styled(Card)`
  padding: 24px 24px 32px;
  position: relative;
  overflow: hidden;

  @media ${mq.down(breakpoints.lg)} {
    padding: 12px 8px 24px;

    ${YourPoolCard.Summary} {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    ${YourPoolCard.Info},
    ${YourPoolCard.Details} {
      padding: 16px 16px 0;
    }

    ${YourPoolCard.InfoFields} {
      & > * + * {
        margin-top: 16px;
      }
    }

    ${YourPoolCard.PoolCounters} {
      grid-template-columns: 1fr 1fr;
      padding: 16px;
      gap: 8px;
      align-items: start;
    }

    ${YourPoolCard.UsersCounter} {
      ${typography.h4}
    }

    ${YourPoolCard.InfoActions} {
      & > * + * {
        margin-left: 58px;
      }
    }
  }
`
