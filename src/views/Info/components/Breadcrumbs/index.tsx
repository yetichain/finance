import Link from 'next/link'
import { Fragment, ReactNode } from 'react'
import styled from 'styled-components'
import { ReactComponent as ChevronIcon } from './assets/chevron.svg'

export interface BreadcrumbsProps {
  items: Array<{
    title: ReactNode
    href: string
  }>
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumbs.Root>
      {items.map((item, index) => (
        <Fragment key={item.href}>
          <Link passHref href={item.href}>
            <Breadcrumbs.Item>{item.title}</Breadcrumbs.Item>
          </Link>
          {index + 1 !== items.length && <ChevronIcon />}
        </Fragment>
      ))}
    </Breadcrumbs.Root>
  )
}

Breadcrumbs.Item = styled.a`
  background: rgba(108, 93, 211, 0.1);
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: #8990a5;
  padding: 4px 8px;
`

Breadcrumbs.Root = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  & > * + * {
    margin-left: 4px;
  }
`
