import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Button } from 'ui'
import { ReactComponent as PlusIcon } from './assets/plus.svg'

export interface AddLiquidityProps {
  token0: string
  token1?: string
}

export default function AddLiquidity({ token0, token1 }: AddLiquidityProps) {
  const { t } = useTranslation()
  return (
    <Link passHref href={[`/add/${token0}`, token1].filter(Boolean).join('/')}>
      <Button as='a' variant='outlined'>
        <PlusIcon />
        {t('Add Liquidity')}
      </Button>
    </Link>
  )
}
