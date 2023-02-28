import BigNumber from 'bignumber.js'
import { networkLabels } from 'constants/bridge/bridge.constants'
import { format, fromUnixTime } from 'date-fns'
import { useBridgeDirection } from 'hooks/bridge/useBridgeDirection'
import { useClaim } from 'hooks/bridge/useClaim'
import useToast from 'hooks/useToast'
import { useTranslation } from 'next-i18next'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { getExplorerLink } from 'utils'
import { toEther } from 'utils/bigNumber'
import { TransferItem } from 'utils/bridge/history'
import { formatAddress, formatBigNumber } from 'views/StrongHoldersPool/utils'
import { ReactComponent as ArrowIcon } from './arrow.svg'
import { ReactComponent as CheckIcon } from './check.svg'
import { ReactComponent as QuestionIcon } from './question.svg'
import { ReactComponent as RotateIcon } from './rotate.svg'

export interface HistoryTableItemProps {
  item: TransferItem
  directionInDate?: boolean
}

export function HistoryTableItem({ item, directionInDate }: HistoryTableItemProps) {
  const { getBridgeChainId } = useBridgeDirection()
  const bridgeChainId = getBridgeChainId(item.chainId)
  const claim = useClaim()
  const [claimTx, setClaimTx] = useState<string>()
  const { toastError } = useToast()
  const [claiming, setClaiming] = useState(false)
  const receivingTx = claimTx || item.receivingTx
  const claimed = !!receivingTx
  const failed = item.receivingTx && item.status === false

  const onClaim = useCallback(async () => {
    try {
      setClaiming(true)
      setClaimTx(await claim(item.sendingTx, item.message))
    } catch (error) {
      console.error(error)
      toastError(error.data?.message || error.message)
    } finally {
      setClaiming(false)
    }
  }, [claim, item.message, item.sendingTx, toastError])

  return (
    <HistoryTableItem.Root>
      <td>
        <span>{getDate(item.timestamp)}</span>
        {directionInDate && <Direction from={item.chainId} to={bridgeChainId} />}
      </td>
      {!directionInDate && (
        <td>
          <Direction from={item.chainId} to={bridgeChainId} />
        </td>
      )}
      <td>
        <a href={getExplorerLink(item.chainId, item.sendingTx, 'transaction')} target='blank'>
          {formatAddress(item.sendingTx, 6, 4)}
        </a>
      </td>
      <td>
        {receivingTx ? (
          <a href={getExplorerLink(bridgeChainId, item.receivingTx, 'transaction')} target='blank'>
            {formatAddress(item.receivingTx, 6, 4)}
          </a>
        ) : (
          '—'
        )}
      </td>
      <td>{getAmount(item.amount, item.toToken)}</td>
      <td>
        <Status claiming={claiming} claimed={claimed} failed={failed} onClaim={onClaim} />
      </td>
    </HistoryTableItem.Root>
  )
}

HistoryTableItem.Root = styled.tr`
  & > td {
    ${typography.ultrasmall.regular}
    color: #0B1359;
    padding: 16px;
    vertical-align: middle;

    & > a {
      color: #6c5dd3;
    }

    &:last-of-type {
      text-align: right;
    }

    &:nth-child(1) {
      & > * + * {
        margin-top: 4px;
      }
    }
  }

  &:hover {
    background: #f4f5fa;
  }

  @media ${mq.down(breakpoints.lg)} {
    & > td {
      padding: 16px 8px;
    }
  }
`

function getDate(timestamp: TransferItem['timestamp']) {
  return format(fromUnixTime(Number(timestamp)), 'd MMM yyyy, HH:mm')
}

function getAmount(amount: TransferItem['amount'], token: TransferItem['toToken']) {
  return formatBigNumber(toEther(new BigNumber(amount))) + ' ' + token.symbol
}

interface DirectionProps {
  from: number
  to: number
}

function Direction({ from, to }: DirectionProps) {
  return (
    <Direction.Root>
      <div>{networkLabels[from]}</div>
      <ArrowIcon />
      <div>{networkLabels[to]}</div>
    </Direction.Root>
  )
}

Direction.Root = styled.div`
  display: flex;
  align-items: center;

  & > div {
    ${typography.ultrasmall.medium}
    border-radius: 6px;
    padding: 5px 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:first-of-type {
      color: #24ba7b;
      background: #dfefed;
    }

    &:last-of-type {
      color: #6c5dd3;
      background: #e9e7f8;
    }
  }

  & > * + * {
    margin-left: 2px;
  }
`

interface StatusProps {
  onClaim?: () => any
  claimed?: boolean
  claiming?: boolean
  failed?: boolean
}

function Status({ claiming, claimed, failed, onClaim }: StatusProps) {
  const { t } = useTranslation()

  if (claimed) {
    return (
      <Status.Root $color={failed ? 'failed' : 'success'}>
        {failed ? <QuestionIcon /> : <CheckIcon />}
        {failed ? t('Failed') : t('Claimed')}
      </Status.Root>
    )
  }

  return (
    <Status.Root onClick={onClaim} disabled={claiming} type='button' as='button' $color='claim'>
      <RotateIcon />
      {t('Claim token')}
    </Status.Root>
  )
}

Status.Root = styled.div<{ $color: 'failed' | 'success' | 'claim' }>`
  ${typography.ultrasmall.medium}

  display: inline-flex;
  align-items: center;

  & > svg {
    margin-right: 8px;
  }

  button& {
    background: none;
    border: none;
    padding: 0;
    text-decoration: underline;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  color: ${({ $color }) => {
    switch ($color) {
      case 'success':
        return '#24BA7B'
      case 'failed':
        return '#FF4D00'
      case 'claim':
        return '#FFA100'
    }
  }};
`
