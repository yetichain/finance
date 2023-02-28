import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import { formatPercent } from 'views/Info/utils'

export interface PercentProps extends inferStyledProps<typeof Percent['Root']> {
  value: number
}

export default function Percent({ value, ...restProps }: PercentProps) {
  return (
    <Percent.Root data-negative={value < 0 || undefined} {...restProps}>
      {formatPercent(value)}
    </Percent.Root>
  )
}

Percent.Root = styled.span`
  color: #24ba7b;

  &[data-negative] {
    color: #f04628;
  }
`
