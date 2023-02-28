import { useWeb3React } from '@web3-react/core'
import { Button, ChevronRightIcon, Skeleton, useModal } from 'alium-uikit/src'
import { StyledInternalLink } from 'components/Shared'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import { ethersToBN, toEther } from 'utils/bigNumber'
import {
  useCurrentPoolId,
  useMaxPoolLength,
  usePoolAmount,
  usePoolUsers,
  useRewardTokenSymbol,
} from 'views/StrongHoldersPool/hooks'
import BonusNft from '../BonusNft'
import FormattedValue from '../FormattedValue'
import JoinPoolModal from '../JoinPoolModal'
import Title from '../Title'
import UsersProgressBar from '../UsersProgressBar'

export default function JoinPoolCard() {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { data: currentPoolId } = useCurrentPoolId()
  const { data: poolUsers } = usePoolUsers(currentPoolId)
  const poolAmount = usePoolAmount(currentPoolId)
  const { data: maxPoolLength } = useMaxPoolLength()
  const rewardTokenSymbol = useRewardTokenSymbol()
  const [openModal] = useModal(<JoinPoolModal />, false)
  return (
    <JoinPoolCard.Root>
      <JoinPoolCard.Content>
        <JoinPoolCard.Info>
          <JoinPoolCard.Field>
            <Title>{t('Pool Amount')}</Title>
            {poolAmount ? (
              <JoinPoolCard.Amount value={toEther(ethersToBN(poolAmount))} tokenSymbol={rewardTokenSymbol} />
            ) : (
              <Skeleton />
            )}
          </JoinPoolCard.Field>
          <JoinPoolCard.Join disabled={!account} onClick={openModal}>
            {t('Join the pool')}
          </JoinPoolCard.Join>
          <JoinPoolCard.Field>
            <BonusNft poolId={currentPoolId} />
          </JoinPoolCard.Field>
        </JoinPoolCard.Info>
        {poolUsers && maxPoolLength && <UsersProgressBar current={poolUsers.length} all={maxPoolLength.toNumber()} />}
      </JoinPoolCard.Content>
      <JoinPoolCard.Footer>
        <span>{t('Increase your YET Tokens by joining the Strong Holders Pool.')} </span>
        <StyledInternalLink href='https://docs.yetichain.com' target='_blank'>
          {t('More details')}
          <ChevronRightIcon color='currentColor' />
        </StyledInternalLink>
      </JoinPoolCard.Footer>
    </JoinPoolCard.Root>
  )
}

JoinPoolCard.Content = styled.div`
  padding: 32px 32px 24px 24px;
  display: flex;
  justify-content: space-between;
  flex: 1;

  & > * {
    flex-shrink: 0;
  }
`

JoinPoolCard.Info = styled.div`
  display: flex;
  flex-direction: column;
`

JoinPoolCard.Field = styled.div`
  display: flex;
  flex-direction: column;

  & > ${Title} {
    margin-bottom: 8px;
  }
`

JoinPoolCard.Amount = styled(FormattedValue)`
  ${typography.h3}

  @media ${mq.down(breakpoints.sm)} {
    ${typography.h4}
  }
`

JoinPoolCard.Join = styled(Button)`
  margin: 16px 0 32px;
`

JoinPoolCard.Footer = styled.div`
  ${typography.ultrasmall.regular}
  color: #8990a5;
  padding: 15px 24px;
  border-top: 1px solid #f4f5fa;

  svg {
    vertical-align: middle;
  }
`

JoinPoolCard.Root = styled(Card)`
  display: flex;
  flex-direction: column;

  @media ${mq.down(breakpoints.sm)} {
    ${JoinPoolCard.Content} {
      flex-direction: column-reverse;
      align-items: center;
      padding: 24px 0;
    }

    ${JoinPoolCard.Info} {
      align-items: center;
      margin-top: 24px;
    }

    ${JoinPoolCard.Field} {
      align-items: center;
    }

    ${JoinPoolCard.Footer} {
      display: flex;
      text-align: center;
      flex-direction: column;
    }
  }
`
