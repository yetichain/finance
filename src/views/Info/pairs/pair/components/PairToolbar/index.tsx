import { useTranslation } from 'next-i18next'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import AddLiquidity from 'views/Info/components/AddLiquidity'
import CurrencyLogo from 'views/Info/components/CurrencyLogo'
import PairCurrencyLogo from 'views/Info/components/PairCurrencyLogo'
import Toolbar, { ToolbarProps } from 'views/Info/components/Toolbar/Toolbar'
import ToolbarActions from 'views/Info/components/Toolbar/ToolbarActions'
import ToolbarRow from 'views/Info/components/Toolbar/ToolbarRow'
import ToolbarTitle from 'views/Info/components/Toolbar/ToolbarTitle'
import Trade from 'views/Info/components/Trade'
import { PairQueryData } from 'views/Info/types'
import { getPairName } from 'views/Info/utils/pairs'
import PriceTooltip from './PriceTooltip'

export interface PairToolbarProps extends ToolbarProps {
  pair: PairQueryData
}

export default function PairToolbar({ pair, ...restProps }: PairToolbarProps) {
  const { t } = useTranslation()
  const isMobile = useMedia(mq.down(breakpoints.sm))
  return (
    <Toolbar {...restProps}>
      <ToolbarRow>
        <PairToolbar.Main>
          <PairCurrencyLogo address0={pair.token0.id} address1={pair.token1.id} />
          <ToolbarTitle>
            {t('{{name}} Pair', { name: getPairName(pair.token0.symbol, pair.token1.symbol) })}
          </ToolbarTitle>
          <PriceTooltip pair={pair} />
        </PairToolbar.Main>
        {!isMobile && <ToolbarActions />}
      </ToolbarRow>
      <ToolbarRow>
        <PairToolbar.Actions>
          <Trade token0={pair.token0.id} token1={pair.token1.id} />
          <AddLiquidity token0={pair.token0.id} token1={pair.token1.id} />
        </PairToolbar.Actions>
        {isMobile && <ToolbarActions />}
      </ToolbarRow>
    </Toolbar>
  )
}

PairToolbar.Actions = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
`

PairToolbar.Main = styled.div`
  display: flex;
  align-items: center;

  ${CurrencyLogo.Root} {
    --logo-size: 48px;
  }

  ${ToolbarTitle} {
    margin: 0 8px 0 16px;
  }

  ${PriceTooltip.Root} {
    align-self: flex-start;
  }

  @media ${mq.down(breakpoints.md)} {
    ${CurrencyLogo.Root} {
      --logo-size: 32px;
    }
  }
`
