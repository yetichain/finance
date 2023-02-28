import { Percent } from '@alium-official/sdk'
import { Text } from 'alium-uikit/src'
import { ONE_BIPS } from 'config/settings'
import styled from 'styled-components'

/**
 * Formatted version of price impact text with warning colors
 */

const StyledText = styled(Text)`
  @media screen and (max-width: 530px) {
    font-size: 11px;
  }
`

export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <StyledText
      fontSize='14px'
      // severity={warningSeverity(priceImpact)}
      color='#6C5DD3'
    >
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </StyledText>
  )
}
