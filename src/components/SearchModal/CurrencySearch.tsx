import { Currency, Token } from '@alium-official/sdk'
import { CloseIcon, IconButton, Text } from 'alium-uikit/src'
import { useActiveWeb3React } from 'hooks'
import { useAllTokens, useToken } from 'hooks/Tokens'
import { useTranslation } from 'next-i18next'
// import { KeyboardEvent, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { KeyboardEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
// import { useSelectedListInfo } from 'state/lists/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
// import styled, { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import { isAddress } from 'utils'
import { arrayElementToTop } from 'utils/arrayElementToTop'
// import Card from '../Card'
import Column from '../Column'
// import ListLogo from '../ListLogo'
import QuestionHelper from '../QuestionHelper'
// import Row, { RowBetween } from '../Row'
import { RowBetween } from '../Row'
// import { LinkStyledButton, TYPE } from '../Shared'
// import { TYPE } from '../Shared'
import TranslatedText from '../TranslatedText'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import { filterTokens } from './filtering'
import SortButton from './SortButton'
import { useTokenComparator } from './sorting'
import { PaddedColumn, SearchInput, Separator } from './styleds'

// const { main: Main } = TYPE

interface CurrencySearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  onChangeList: () => void
  currencyList?: any
}

export function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  onDismiss,
  isOpen,
  onChangeList,
  currencyList,
}: CurrencySearchProps) {
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)
  const nativeSymbol = currentNetwork?.providerParams?.nativeCurrency?.symbol?.toLowerCase() || 'bnb'
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  // const theme = useContext(ThemeContext)

  const fixedList = useRef<FixedSizeList>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [invertSearchOrder, setInvertSearchOrder] = useState<boolean>(false)
  const globalTokenList = useAllTokens()
  const allTokens = currencyList || globalTokenList

  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery)
  const searchToken = useToken(searchQuery)

  const showETH: boolean = useMemo(() => {
    const s = searchQuery.toLowerCase().trim()
    if (currencyList) return false
    // input includes native symbol
    return s !== '' && !nativeSymbol.indexOf(s)
  }, [currencyList, searchQuery])

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    if (isAddressSearch) return searchToken ? [searchToken] : []
    return filterTokens(Object.values(allTokens), searchQuery)
  }, [isAddressSearch, searchToken, allTokens, searchQuery])

  const filteredSortedTokens: Token[] = useMemo(() => {
    if (searchToken) return [searchToken]
    const sorted = filteredTokens.sort(tokenComparator)
    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0)
    if (symbolMatch.length > 1) return sorted

    const sortedTokens = [
      ...(searchToken ? [searchToken] : []),
      // sort any exact symbol matches first
      ...sorted.filter((token) => token.symbol?.toLowerCase() === symbolMatch[0]),
      ...sorted.filter((token) => token.symbol?.toLowerCase() !== symbolMatch[0]),
    ]

    const conditionForTokenToTop = (el: Token) => el.symbol === 'ALM'
    const sortedWithAlmFirst: Token[] = arrayElementToTop(conditionForTokenToTop, sortedTokens)
    return sortedWithAlmFirst
  }, [filteredTokens, searchQuery, searchToken, tokenComparator])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect],
  )

  // clear the input on open
  useEffect(() => {
    if (isOpen) setSearchQuery('')
  }, [isOpen])

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = searchQuery.toLowerCase().trim()
        if (s === nativeSymbol) {
          handleCurrencySelect(currentNetwork.providerParams.nativeCurrency)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === searchQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    [filteredSortedTokens, handleCurrencySelect, searchQuery],
  )

  // const selectedListInfo = useSelectedListInfo()

  return (
    <Column style={{ width: '100%', flex: '1 1' }}>
      <PaddedColumn gap='14px'>
        <RowBetween>
          <Text style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }} bold>
            {t('Select a token')}
            <QuestionHelper
              text={t('Find a token by searching for its name or symbol or by pasting its address below.')}
            />
          </Text>
          <IconButton buttonType='close' buttonSize='40px' onClick={onDismiss}>
            <CloseIcon />
          </IconButton>
        </RowBetween>
        <Separator />
        <StyledSearchInput>
          <SearchInput
            type='text'
            id='token-search-input'
            placeholder={t('Search name or paste address')}
            value={searchQuery}
            ref={inputRef as RefObject<HTMLInputElement>}
            onChange={handleInput}
            onKeyDown={handleEnter}
          />
          <StyledRemoveIcon>
            {searchQuery.length > 0 && <CloseIcon onClick={() => setSearchQuery('')} />}
          </StyledRemoveIcon>
        </StyledSearchInput>
        {showCommonBases && (
          <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
        )}
        <StyledRowBetween>
          <RowBetween>
            <Text fontSize='16px' bold>
              <TranslatedText translationId={126}>{t('Token name')}</TranslatedText>
            </Text>
            <SortButton ascending={invertSearchOrder} toggleSortOrder={() => setInvertSearchOrder((iso) => !iso)} />
          </RowBetween>
        </StyledRowBetween>
      </PaddedColumn>

      <StyledCurrencyList>
        <AutoSizer disableWidth>
          {({ height }) => (
            <CurrencyList
              height={height}
              showETH={showETH}
              currencies={filteredSortedTokens}
              onCurrencySelect={handleCurrencySelect}
              otherCurrency={otherSelectedCurrency}
              selectedCurrency={selectedCurrency}
              fixedListRef={fixedList}
            />
          )}
        </AutoSizer>
      </StyledCurrencyList>

      {/*
         <Separator />
          <Card>
            <RowBetween>
              {selectedListInfo.current ? (
                <Row>
                  {selectedListInfo.current.logoURI ? (
                    <ListLogo
                      style={{ marginRight: 12 }}
                      logoURI={selectedListInfo.current.logoURI}
                      alt={`${selectedListInfo.current.name} list logo`}
                    />
                  ) : null}
                  <Main id='currency-search-selected-list-name'>{selectedListInfo.current.name}</Main>
                </Row>
              ) : null}
              <LinkStyledButton
                style={{ fontWeight: 500, color: theme.colors.textSubtle, fontSize: 16 }}
                onClick={onChangeList}
                id='currency-search-change-list-button'
              >
                {selectedListInfo.current ? 'Change' : 'Select a list'}
              </LinkStyledButton>
            </RowBetween>
          </Card>
      */}
    </Column>
  )
}

export default CurrencySearch

// styles

const StyledRowBetween = styled.div`
  padding: 0 22px 2px 22px;
`

const StyledCurrencyList = styled.div`
  flex: 1;
  padding-left: 16px;
`

const StyledSearchInput = styled.div`
  position: relative;
`

const StyledRemoveIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 40px;
  cursor: pointer;
`
