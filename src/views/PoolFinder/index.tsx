import { Currency, JSBI, TokenAmount } from '@alium-official/sdk'
import { AddIcon, Button, CardBody, ChevronDownIcon, Text } from 'alium-uikit/src'
import { LightCard } from 'components/Card'
import { CardNav } from 'components/CardNav'
import { AutoColumn, ColumnCenter } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import { FindPoolTabs } from 'components/NavigationTabs'
import { MinimalPositionCard } from 'components/PositionCard'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { StyledInternalLink } from 'components/Shared'
import { PairState, usePair } from 'data/Reserves'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'
import { ROUTES } from 'routes'
import { usePairAdder } from 'state/user/hooks'
import { useTokenBalance } from 'state/wallet/hooks'
import { storeNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { currencyId } from 'utils/currencyId'
import { Dots } from 'views/Pool/styleds'
import SwapAppBody from 'views/Swap/SwapAppBody'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

export default function PoolFinder() {
  const { nativeCurrency } = storeNetwork.getState().currentNetwork.providerParams
  const { account } = useActiveWeb3React()

  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)

  const [currency0, setCurrency0] = useState<Currency | null>(nativeCurrency)
  const [currency1, setCurrency1] = useState<Currency | null>(null)
  const { t } = useTranslation()

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()

  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false)
  }, [setShowSearch])

  const prerequisiteMessage = (
    <LightCard padding='30px 10px'>
      <Text style={{ textAlign: 'center' }}>
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </Text>
    </LightCard>
  )

  return (
    <>
      <CardNav activeIndex={1} />
      <SwapAppBody>
        <FindPoolTabs />
        <CardBody>
          <AutoColumn gap='md'>
            <Button
              onClick={() => {
                setShowSearch(true)
                setActiveField(Fields.TOKEN0)
              }}
              startIcon={currency0 ? <CurrencyLogo currency={currency0} style={{ marginRight: '.5rem' }} /> : null}
              endIcon={<ChevronDownIcon width='24px' color='white' />}
              fullwidth
            >
              {currency0 ? currency0.symbol : t('Select a token')}
            </Button>

            <ColumnCenter>
              <StyledAddIcon>
                <AddIcon color='#6C5DD3' width='12px' />
              </StyledAddIcon>
            </ColumnCenter>

            <Button
              onClick={() => {
                setShowSearch(true)
                setActiveField(Fields.TOKEN1)
              }}
              startIcon={currency1 ? <CurrencyLogo currency={currency1} style={{ marginRight: '.5rem' }} /> : null}
              endIcon={<ChevronDownIcon width='24px' color='white' />}
              fullwidth
            >
              {currency1 ? currency1.symbol : t('Select a token')}
            </Button>

            {hasPosition && (
              <ColumnCenter
                style={{ justifyItems: 'center', backgroundColor: '', padding: '12px 0px', borderRadius: '12px' }}
              >
                <Text style={{ textAlign: 'center' }}>{t('Pool Found!')}</Text>
              </ColumnCenter>
            )}

            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <MinimalPositionCard pair={pair} />
                ) : (
                  <LightCard padding='30px 10px'>
                    <AutoColumn gap='sm' justify='center'>
                      <Text style={{ textAlign: 'center' }}>{t('You don’t have liquidity in this pool yet.')}</Text>
                      <StyledInternalLink href={ROUTES.addByMultiple(currencyId(currency0), currencyId(currency1))}>
                        <Text style={{ textAlign: 'center' }}>{t('Add Liquidity')}</Text>
                      </StyledInternalLink>
                    </AutoColumn>
                  </LightCard>
                )
              ) : validPairNoLiquidity ? (
                <LightCard padding='30px 10px'>
                  <AutoColumn gap='sm' justify='center'>
                    <Text style={{ textAlign: 'center' }}>{t('No pool found.')}</Text>
                    <StyledInternalLink href={ROUTES.addByMultiple(currencyId(currency0), currencyId(currency1))}>
                      {t('Create pool.')}
                    </StyledInternalLink>
                  </AutoColumn>
                </LightCard>
              ) : pairState === PairState.INVALID ? (
                <LightCard padding='30px 10px'>
                  <AutoColumn gap='sm' justify='center'>
                    <Text style={{ textAlign: 'center' }}>{t('Invalid pair.')}</Text>
                  </AutoColumn>
                </LightCard>
              ) : pairState === PairState.LOADING ? (
                <LightCard padding='30px 10px'>
                  <AutoColumn gap='sm' justify='center'>
                    <Text style={{ textAlign: 'center' }}>
                      {t('Loading')}
                      <Dots />
                    </Text>
                  </AutoColumn>
                </LightCard>
              ) : null
            ) : (
              prerequisiteMessage
            )}
          </AutoColumn>

          <CurrencySearchModal
            isOpen={showSearch}
            onCurrencySelect={handleCurrencySelect}
            onDismiss={handleSearchDismiss}
            showCommonBases
            selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
          />
        </CardBody>
      </SwapAppBody>
    </>
  )
}

// styles

const StyledAddIcon = styled.div`
  border: 1.5px solid #6c5dd3;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  display: flex;

  & > * {
    margin: auto;
  }
`
