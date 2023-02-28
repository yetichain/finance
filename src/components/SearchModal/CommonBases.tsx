import { ChainId, Currency, currencyEquals, Token } from '@alium-official/sdk'
import { Text } from 'alium-uikit/src'
import { SUGGESTED_BASES } from 'constants/index'
import { useTranslation } from 'next-i18next'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.tertiary)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.invertedContrast};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.tertiary};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)
  const { nativeCurrency } = currentNetwork.providerParams
  const { t } = useTranslation()
  return (
    <AutoColumn gap='md'>
      <AutoRow>
        <Text fontSize='14px'>?</Text>
        <QuestionHelper text='?' />
      </AutoRow>
      <AutoRow gap='4px'>
        <BaseWrapper
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, nativeCurrency)) {
              onSelect(nativeCurrency)
            }
          }}
          disable={selectedCurrency === nativeCurrency}
        >
          <CurrencyLogo currency={nativeCurrency} style={{ marginRight: 8 }} />
          <Text>?</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
