import BigNumber from 'bignumber.js'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { typography } from 'ui'
import { formatBigNumber } from 'views/StrongHoldersPool/utils'

export interface FormattedValueProps {
  value: BigNumber
  tokenSymbol?: ReactNode
  className?: string
}

export default function FormattedValue({ value, tokenSymbol, className }: FormattedValueProps) {
  return (
    <FormattedValue.Root className={className}>
      {formatBigNumber(value)}
      {tokenSymbol && <FormattedValue.TokenSymbol> {tokenSymbol}</FormattedValue.TokenSymbol>}
    </FormattedValue.Root>
  )
}

FormattedValue.Root = styled.div``
FormattedValue.TokenSymbol = styled.span`
  ${typography.ultrasmall.medium}
`
