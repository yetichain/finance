import { Skeleton } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { ethersToBN } from 'utils/bigNumber'
import { useOpenedPools } from 'views/StrongHoldersPool/hooks'
import { PoolIcon } from 'views/StrongHoldersPool/icons'
import StatsCard from '../StatsCard'
import Title from '../Title'

export default function OpenedPoolsCard() {
  const { t } = useTranslation()
  const { data: openedPools } = useOpenedPools()
  return (
    <StatsCard
      icon={<PoolIcon />}
      title={<Title>{t('Opened pools')}</Title>}
      content={openedPools ? <StatsCard.Value value={ethersToBN(openedPools)} /> : <Skeleton height='100%' />}
    />
  )
}
