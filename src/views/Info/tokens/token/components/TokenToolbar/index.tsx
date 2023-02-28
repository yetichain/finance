import { useTranslation } from 'next-i18next'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { formatNumber } from 'utils/formatBalance'
import AddLiquidity from 'views/Info/components/AddLiquidity'
import CurrencyLogo from 'views/Info/components/CurrencyLogo'
import Percent from 'views/Info/components/Percent'
import Toolbar, { ToolbarProps } from 'views/Info/components/Toolbar/Toolbar'
import ToolbarActions from 'views/Info/components/Toolbar/ToolbarActions'
import ToolbarRow from 'views/Info/components/Toolbar/ToolbarRow'
import ToolbarTitle from 'views/Info/components/Toolbar/ToolbarTitle'
import Trade from 'views/Info/components/Trade'
import { TokenQueryData } from 'views/Info/types'
import { formatTokenSymbol, getPercentChange } from 'views/Info/utils'

export interface TokenToolbarProps extends ToolbarProps {
  token: TokenQueryData
}

export default function TokenToolbar({ token, ...restProps }: TokenToolbarProps) {
  const { t } = useTranslation()
  const isDownLg = useMedia(mq.down(breakpoints.lg))
  const isMobile = useMedia(mq.down(breakpoints.sm))
  const price = Number(token.tokenDayData[0]?.priceUSD) || 0
  const priceChange = getPercentChange(Number(token.tokenDayData[1]?.priceUSD) || 0, price)

  const priceNode = (
    <TokenToolbar.Price>
      <span>${formatNumber(price)}</span>
      <Percent value={priceChange} />
    </TokenToolbar.Price>
  )

  return (
    <Toolbar {...restProps}>
      <ToolbarRow>
        <TokenToolbar.Main>
          <CurrencyLogo address={token.id} />
          <ToolbarTitle>
            {token.name} ({formatTokenSymbol(token.symbol)})
          </ToolbarTitle>
          {!isMobile && priceNode}
        </TokenToolbar.Main>
        {!isDownLg && <ToolbarActions />}
      </ToolbarRow>
      {isMobile && <ToolbarRow>{priceNode}</ToolbarRow>}
      <ToolbarRow>
        <TokenToolbar.Actions>
          <Trade token0={token.id} />
          <AddLiquidity token0={token.id} />
        </TokenToolbar.Actions>
        {isDownLg && <ToolbarActions />}
      </ToolbarRow>
    </Toolbar>
  )
}

TokenToolbar.Main = styled.div`
  display: flex;
  align-items: center;

  ${CurrencyLogo.Root} {
    --logo-size: 48px;
  }

  ${ToolbarTitle} {
    margin: 0 16px;
  }

  @media ${mq.down(breakpoints.lg)} {
    ${ToolbarTitle} {
      margin-left: 8px;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    ${CurrencyLogo.Root} {
      --logo-size: 32px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    ${CurrencyLogo.Root} {
      --logo-size: 40px;
    }
  }
`

TokenToolbar.Price = styled.div`
  & > span:first-child {
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #0b1359;
    margin-right: 8px;
  }
`

TokenToolbar.Actions = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 8px;
`
