import QuestionHelper from 'components/QuestionHelper'
import styled from 'styled-components'
import { typography } from 'ui'
import CurrencyLogo from 'views/Info/components/CurrencyLogo'
import { PairQueryData } from 'views/Info/types'
import { formatNumber, formatTokenSymbol } from 'views/Info/utils'

export interface PriceTooltipProps {
  pair: PairQueryData
}

const formatPrice = (symbol0: string, price: number, symbol1: string, usd: number) =>
  `1 ${symbol0} = ${formatNumber(price, { maximumFractionDigits: 8 })} ${symbol1} ($${formatNumber(usd)})`

export default function PriceTooltip({ pair }: PriceTooltipProps) {
  const token0Symbol = formatTokenSymbol(pair.token0.symbol)
  const token1Symbol = formatTokenSymbol(pair.token1.symbol)

  const token0Price = Number(pair.token0Price)
  const token1Price = Number(pair.token1Price)

  const token0USD = Number(pair.token0.derivedUSD) || 0
  const token1USD = Number(pair.token1.derivedUSD) || 0

  return (
    <PriceTooltip.Root
      text={
        <PriceTooltip.Content>
          <div>
            <CurrencyLogo address={pair.token0.id} />
            <span>{formatPrice(token0Symbol, token1Price, token1Symbol, token0USD)}</span>
          </div>
          <div>
            <CurrencyLogo address={pair.token1.id} />
            <span>
              <span>{formatPrice(token1Symbol, token0Price, token0Symbol, token1USD)}</span>
            </span>
          </div>
        </PriceTooltip.Content>
      }
    />
  )
}

PriceTooltip.Root = styled(QuestionHelper)`
  &__tooltip {
    width: auto;
  }
`

PriceTooltip.Content = styled.div`
  display: grid;
  gap: 6px;

  ${CurrencyLogo.Root} {
    --logo-size: 18px;
  }

  & > div {
    display: grid;
    grid-auto-flow: column;
    gap: 6px;
    justify-content: start;
    align-items: center;

    ${typography.tiny.medium}
    color: #0B1359;
  }
`
