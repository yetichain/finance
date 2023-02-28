import { Currency, Pair, Percent, Price } from '@alium-official/sdk'
import { Text as UIKitText } from 'alium-uikit/src'
import { AutoColumn } from 'components/Column'
import Pane from 'components/Pane'
import { MinimalPositionCard } from 'components/PositionCard'
import { PairState } from 'data/Reserves'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { Field } from 'state/mint/actions'
import styled from 'styled-components'
import { PoolPriceBar } from './PoolPriceBar'

interface Props {
  pair: Pair
  noLiquidity: boolean
  pairState: PairState
  oneCurrencyIsWETH: boolean
}

interface CurrenciesProps {
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  pairState: PairState
  noLiquidity: boolean
  poolTokenPercentage: Percent
  price: Price
}

export const InvalidPair: FC<Props> = ({ pair, noLiquidity, pairState, oneCurrencyIsWETH }) => {
  if (pair && !noLiquidity && pairState !== PairState.INVALID) {
    return (
      <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
        <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
      </AutoColumn>
    )
  }
  return null
}

export const InvalidPairCurrencies: FC<CurrenciesProps> = ({
  currencies,
  pairState,
  noLiquidity,
  poolTokenPercentage,
  price,
}) => {
  const { t } = useTranslation()

  if (currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID) {
    return (
      <div>
        <StyledUIKitText
          style={{ textTransform: 'uppercase', fontWeight: 600 }}
          color='textSubtle'
          fontSize='12px'
          mb='2px'
        >
          {noLiquidity ? t('Initial prices and pool share') : t('Prices and pool share')}
        </StyledUIKitText>
        <Pane>
          <PoolPriceBar
            currencies={currencies}
            poolTokenPercentage={poolTokenPercentage}
            noLiquidity={noLiquidity}
            price={price}
          />
        </Pane>
      </div>
    )
  }
  return null
}

// styles

const StyledUIKitText = styled(UIKitText)`
  @media screen and (max-width: 600px) {
    text-align: center;
  }
`
