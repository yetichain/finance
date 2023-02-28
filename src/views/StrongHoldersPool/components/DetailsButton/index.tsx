import { ChevronDownIcon, ChevronUpIcon } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'
import { typography } from 'ui'

export interface DetailsButtonProps extends ComponentPropsWithoutRef<'button'> {
  isOpen?: boolean
}

export default function DetailsButton({ isOpen, ...restProps }: DetailsButtonProps) {
  const { t } = useTranslation()
  return (
    <DetailsButton.Root type='button' {...restProps}>
      {isOpen ? t('Hide') : t('Details')}
      {isOpen ? <ChevronUpIcon color='currentColor' /> : <ChevronDownIcon color='currentColor' />}
    </DetailsButton.Root>
  )
}

DetailsButton.Root = styled.button`
  ${typography.button.main}
  background: none;
  border: none;
  display: inline-flex;
  align-items: center;
  color: #8990a5;
  cursor: pointer;
  padding: 0;
  outline: none;

  svg {
    margin-left: 4px;
  }
`
