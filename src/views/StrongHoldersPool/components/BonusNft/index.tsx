import { ChevronRightIcon } from 'alium-uikit/src/components/Svg'
import { StyledInternalLink } from 'components/Shared'
import { ethers } from 'ethers'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import { typography } from 'ui'
import { useIsFullPool, useNftAllRewards, usePoolWithdrawPosition } from 'views/StrongHoldersPool/hooks'
import NftItem from '../NftItem'
import Title from '../Title'

export interface BonusNftProps {
  poolId?: ethers.BigNumber
}

export default function BonusNft({ poolId }: BonusNftProps) {
  const { t } = useTranslation()
  const isFullPool = useIsFullPool(poolId)
  const withdrawPosition = usePoolWithdrawPosition(poolId)
  const { data: nftAllRewards } = useNftAllRewards()
  const nftCounter = useMemo<ethers.BigNumber | undefined>(() => {
    if (nftAllRewards && withdrawPosition) {
      let ret = ethers.BigNumber.from(0)
      Object.keys(nftAllRewards).forEach((position) => {
        const isAlreadyClaimed = isFullPool && withdrawPosition.toNumber() < Number(position)
        nftAllRewards[position].forEach((reward) => {
          ret = ret.add(isAlreadyClaimed ? ethers.BigNumber.from(0) : reward.amount)
        })
      })
      return ret
    }
  }, [isFullPool, nftAllRewards, withdrawPosition])

  if (!nftCounter) {
    return null
  }

  return (
    <BonusNft.Root>
      <NftItem />
      <BonusNft.Info>
        <Title>{t('Bonus NFT')}</Title>
        <BonusNft.Counter>X{nftCounter.toString()}</BonusNft.Counter>
        <BonusNft.MoreDetails href='https://cybercity.game/' target='_blank'>
          {t('More details')}
          <ChevronRightIcon color='currentColor' />
        </BonusNft.MoreDetails>
      </BonusNft.Info>
    </BonusNft.Root>
  )
}

BonusNft.Root = styled.div`
  display: flex;
  align-items: flex-start;
`

BonusNft.Counter = styled.div`
  ${typography.h6}
  margin: 4px 0;
  color: #0b1359;
`

BonusNft.MoreDetails = styled(StyledInternalLink)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
`

BonusNft.Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`
