import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from 'ui'

export interface TableTitleProps {
  children: ReactNode
  seeAllHref?: string
}

export default function TableTitle({ children, seeAllHref }: TableTitleProps) {
  const { t } = useTranslation()
  return (
    <TableTitle.Root>
      <TableTitle.Title>{children}</TableTitle.Title>
      {seeAllHref && (
        <Link passHref href={seeAllHref}>
          <Button as='a' variant='outlined' size='small'>
            {t('See all')}
          </Button>
        </Link>
      )}
    </TableTitle.Root>
  )
}

TableTitle.Title = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.1px;
  color: #0b1359;
`

TableTitle.Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`
