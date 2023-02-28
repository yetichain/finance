import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Button } from 'ui'

export interface TradeProps {
  token0: string
  token1?: string
}

export default function Trade({ token0, token1 }: TradeProps) {
  const { t } = useTranslation()
  return (
    <Link passHref href={[`/swap/${token0}`, token1].filter(Boolean).join('/')}>
      <Button as='a'>{t('Trade')}</Button>
    </Link>
  )
}
