import { useTranslation } from 'next-i18next'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'
import { ReactComponent as ArrowIcon } from './arrow.svg'

export default function BackLink(props: LinkProps) {
  const { t } = useTranslation()
  return (
    <Link passHref {...props}>
      <BackLink.Root>
        <ArrowIcon />
        <p>{t('Back')}</p>
      </BackLink.Root>
    </Link>
  )
}

BackLink.Root = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #8990a5;

  & > svg {
    margin-right: 8px;
  }
`
