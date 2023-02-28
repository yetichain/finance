import { Currency, CurrencyAmount, currencyEquals, Token } from '@alium-official/sdk'
import { Text } from 'alium-uikit/src'
import { useActiveWeb3React } from 'hooks'
import { useIsUserAddedToken } from 'hooks/Tokens'
import { useTranslation } from 'next-i18next'
import { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { FixedSizeList } from 'react-window'
import { useSelectedTokenList, WrappedTokenInfo } from 'state/lists/hooks'
import { useAddUserToken, useRemoveUserAddedToken } from 'state/user/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { storeNetwork, useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { isTokenOnList } from 'utils'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import Column from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import Loader from '../Loaders/Loader'
import { RowFixed } from '../Row'
import { LinkStyledButton, TYPE } from '../Shared'
import { MouseoverTooltip } from '../Tooltip'
import { FadedSpan, MenuItem } from './styleds'

const { main: Main } = TYPE

function currencyKey(currency: Currency): string {
  const { nativeCurrency } = storeNetwork.getState().currentNetwork.providerParams
  return currency instanceof Token ? currency.address : currency === nativeCurrency ? 'ETHER' : ''
}

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{toSignificantCurrency(balance)}</StyledBalanceText>
}

function TokenTags({ currency }: { currency: Currency }) {
  if (!(currency instanceof WrappedTokenInfo)) {
    return <span />
  }

  const { tags } = currency
  if (!tags || tags.length === 0) return <span />

  const tag = tags[0]

  return (
    <TagContainer>
      <MouseoverTooltip text={tag.description}>
        <Tag key={tag.id}>{tag.name}</Tag>
      </MouseoverTooltip>
      {tags.length > 1 ? (
        <MouseoverTooltip
          text={tags
            .slice(1)
            .map(({ name, description }) => `${name}: ${description}`)
            .join('; \n')}
        >
          <Tag>...</Tag>
        </MouseoverTooltip>
      ) : null}
    </TagContainer>
  )
}

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  const chainId = useStoreNetwork((state) => state.currentChainId)
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  const selectedTokenList = useSelectedTokenList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)

  const removeToken = useRemoveUserAddedToken()
  const addToken = useAddUserToken()
  const { t } = useTranslation()

  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <CurrencyLogo currency={currency} size='24px' />
      <Column>
        <Text title={currency.name}>{currency.symbol}</Text>
        <FadedSpan>
          {!isOnSelectedList && customAdded && !(currency instanceof WrappedTokenInfo) ? (
            <Main fontWeight={500}>
              ???
              <LinkStyledButton
                onClick={(event) => {
                  event.stopPropagation()
                  if (chainId && currency instanceof Token) removeToken(chainId, currency.address)
                }}
              >
                ({t('Remove')})
              </LinkStyledButton>
            </Main>
          ) : null}
          {!isOnSelectedList && !customAdded && !(currency instanceof WrappedTokenInfo) ? (
            <Main fontWeight={500}>
              ???
              <LinkStyledButton
                onClick={(event) => {
                  event.stopPropagation()
                  if (currency instanceof Token) addToken(currency)
                }}
              >
                ({t('Add')})
              </LinkStyledButton>
            </Main>
          ) : null}
        </FadedSpan>
      </Column>
      <TokenTags currency={currency} />
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </RowFixed>
    </MenuItem>
  )
}

export default function CurrencyList({
  height,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef,
  showETH,
}: {
  height: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showETH: boolean
}) {
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)
  const { nativeCurrency } = currentNetwork.providerParams
  const itemData = useMemo(() => (showETH ? [...currencies, nativeCurrency] : [...currencies]), [currencies, showETH])

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index]
      const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
      const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency))
      const handleSelect = () => onCurrencySelect(currency)
      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      )
    },
    [onCurrencySelect, otherCurrency, selectedCurrency],
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width='100%'
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}

// styles

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 141px;
  text-overflow: ellipsis;
`

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
