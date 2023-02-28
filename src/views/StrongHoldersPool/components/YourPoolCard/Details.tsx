import { Percent } from '@alium-official/sdk'
import { Skeleton } from 'alium-uikit/src'
import { ethers } from 'ethers'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { ethersToBN, toEther } from 'utils/bigNumber'
import {
  useParticipantNumber,
  usePoolAccountUser,
  usePoolCreatedAt,
  usePoolLocked,
  usePoolUsers,
  usePoolWithdrawals,
  useRewardTokenSymbol,
} from 'views/StrongHoldersPool/hooks'
import { Withdrawal } from 'views/StrongHoldersPool/types'
import { formatAddress, formatBigNumber, isUserPaid } from 'views/StrongHoldersPool/utils'
import PoolDetailsInfo from '../PoolDetailsInfo'

export interface DetailsProps {
  poolId: ethers.BigNumber
}

export default function Details({ poolId }: DetailsProps) {
  const { t } = useTranslation()
  const { data: poolLocked } = usePoolLocked(poolId)
  const { data: withdrawals } = usePoolWithdrawals(poolId)
  const { data: poolUsers } = usePoolUsers(poolId)
  const { data: poolCreatedAt } = usePoolCreatedAt(poolId)
  const participantNumber = useParticipantNumber(poolId)
  const rewardTokenSymbol = useRewardTokenSymbol()
  const accountUser = usePoolAccountUser(poolId)
  const poolShare = useMemo(
    () => accountUser && poolLocked && new Percent(accountUser.balance.toString(), poolLocked.toString()),
    [accountUser, poolLocked],
  )
  const withdrawalByAccount = useMemo(() => {
    const ret: Record<Withdrawal['account'], Withdrawal> = {}
    withdrawals?.forEach((withdrawal) => {
      ret[withdrawal.account.toLowerCase()] = withdrawal
    })
    return ret
  }, [withdrawals])
  return (
    <Details.Root>
      <PoolDetailsInfo
        participantNumber={participantNumber}
        poolShare={poolShare}
        createdAt={poolCreatedAt && ethersToBN(poolCreatedAt)}
      />
      <Details.HistoryTitle>{t('History')}</Details.HistoryTitle>
      <Details.HistoryTable>
        <thead>
          <tr>
            <th>{t('Wallet')}</th>
            <th>{t('Added')}</th>
            <th>{t('Withdraw')}</th>
          </tr>
        </thead>
        <tbody>
          {poolUsers?.map((user) => {
            const withdrawal = withdrawalByAccount?.[user.account.toLowerCase()]
            return (
              <tr key={user.account}>
                <td>{formatAddress(user.account)}</td>
                <td>{formatBigNumber(toEther(ethersToBN(user.balance))) + ' ' + rewardTokenSymbol}</td>
                {isUserPaid(user) ? (
                  <td>
                    {withdrawal ? (
                      formatBigNumber(toEther(ethersToBN(withdrawal.amount))) + ' ' + rewardTokenSymbol
                    ) : (
                      <Skeleton animation='waves' />
                    )}
                  </td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </Details.HistoryTable>
    </Details.Root>
  )
}

Details.Root = styled.div``

Details.HistoryTitle = styled.div`
  ${typography.small.medium};
  color: #6c5dd3;
  margin: 24px 0 16px;
`

Details.HistoryTable = styled.table`
  width: 100%;

  thead {
    border-bottom: 1px solid #f4f5fa;
  }

  th {
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #0b1359;
    text-align: left;
  }

  td,
  th {
    &:last-child {
      text-align: right;
    }
  }

  td {
    ${typography.ultrasmall.medium}
    color: #8990a5;
    vertical-align: middle;

    &:first-child {
      word-wrap: break-word;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  tr {
    display: grid;
    grid-template-columns: repeat(3, 140px);
    gap: 31px;
    padding: 8px;
    border-radius: 6px;

    @media ${mq.down(breakpoints.lg)} {
      grid-template-columns: repeat(3, 70px);
      gap: 44px;
    }

    &:nth-child(even) {
      background: #f4f5fa;
    }
  }
`
