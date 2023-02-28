import Loader from 'components/Loaders/Loader'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import styled from 'styled-components'
import { TOTAL_FEE } from 'views/Info/config'
import { useInfoHeadlineQuery } from 'views/Info/generated'
import { formatNumber, getPeriodChange } from 'views/Info/utils'

function useInfoHeadline() {
  const { data } = useInfoHeadlineQuery()
  return useMemo(() => {
    if (!data) return undefined

    const bnbPrice = Number(data.bundles[0].bnbPrice)
    const transactions24h = getPeriodChange(
      Number(data.aliumDayDatas[1]?.totalTransactions) || 0,
      Number(data.aliumDayDatas[0]?.totalTransactions) || 0,
    )
    const totalPairs = Number(data.aliumFactories[0].totalPairs)
    const fees24h = (Number(data.aliumDayDatas[0]?.dailyVolumeUSD) || 0) * TOTAL_FEE

    return {
      bnbPrice,
      transactions24h,
      totalPairs,
      fees24h,
    }
  }, [data])
}

export default function InfoHeadline() {
  const { t } = useTranslation()
  const data = useInfoHeadline()
  return (
    <InfoHeadline.Root>
      {data ? (
        [
          [t('BNB Price:'), '$' + formatNumber(data.bnbPrice)],
          [t('Transactions (24H):'), formatNumber(data.transactions24h)],
          [t('Pairs:'), formatNumber(data.totalPairs)],
          [t('Fees (24H):'), '$' + formatNumber(data.fees24h)],
        ].map(([title, value], key) => (
          <InfoHeadline.Item key={key}>
            <span>{title}</span>
            <span>{value}</span>
          </InfoHeadline.Item>
        ))
      ) : (
        <Loader />
      )}
    </InfoHeadline.Root>
  )
}

InfoHeadline.Item = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 4px;
  }

  & > span {
    &:nth-of-type(1) {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: #8990a5;
    }

    &:nth-of-type(2) {
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.1px;
      color: #6c5dd3;
    }
  }
`

InfoHeadline.Root = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > * {
    margin-right: 24px;
  }
`
