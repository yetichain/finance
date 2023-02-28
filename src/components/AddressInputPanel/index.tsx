import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { getExplorerLink, useExplorerName } from 'utils'
import useENS from '../../hooks/useENS'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { ExternalLink, TYPE } from '../Shared'

export default function AddressInputPanel({
  id,
  value,
  onChange,
}: {
  id?: string
  // the typed string value
  value: string
  // triggers whenever the typed value changes
  onChange: (value: string) => void
}) {
  const { chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()

  const { address, loading, name } = useENS(value)

  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange],
  )

  const error = Boolean(value.length > 0 && !loading && !address)
  const { explorerName } = useExplorerName(chainId)

  return (
    <InputPanel id={id}>
      <ContainerRow error={error}>
        <InputContainer>
          <AutoColumn gap='md'>
            <RowBetween>
              <Black color={theme.colors.textSubtle} fontWeight={500} fontSize={14}>
                {t('recipient')}
              </Black>
              {address && chainId && (
                <ExternalLink href={getExplorerLink(chainId, name ?? address, 'address')} style={{ fontSize: '14px' }}>
                  {t('(View on {{explorerName}})', { explorerName })}
                </ExternalLink>
              )}
            </RowBetween>
            <Input
              className='recipient-address-input'
              type='text'
              autoComplete='off'
              autoCorrect='off'
              autoCapitalize='off'
              spellCheck='false'
              placeholder={t('Wallet address or ens name')}
              error={error}
              pattern='^(0x[a-fA-F0-9]{40})$'
              onChange={handleInput}
              value={value}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}

// styles

const { black: Black } = TYPE

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  z-index: 1;
  width: 100%;
`

const ContainerRow = styled.div<{ error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.invertedContrast)};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: ${({ theme }) => theme.colors.invertedContrast};
`

const InputContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.primary)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  padding: 0;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`
