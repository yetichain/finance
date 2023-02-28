import { Text } from 'alium-uikit/src'
import { DEFAULT_VERSION, Version } from 'hooks/useToggledVersion'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { stringify } from 'qs'
import { useMemo } from 'react'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import { YellowCard } from '../Card'
import { AutoColumn } from '../Column'
import { StyledInternalLink } from '../Shared'

export default function BetterTradeLink({ version }: { version: Version }) {
  const location = useRouter()
  const search = useParsedQueryString()
  const { t } = useTranslation()
  const linkDestination = useMemo(() => {
    return {
      ...location,
      search: `?${stringify({
        ...search,
        use: version !== DEFAULT_VERSION ? version : undefined,
      })}`,
    }
  }, [location, search, version])

  return (
    <YellowCard style={{ marginTop: '12px', padding: '8px 4px' }}>
      <AutoColumn gap='sm' justify='center' style={{ alignItems: 'center', textAlign: 'center' }}>
        <Text style={{ lineHeight: '145.23%' }} fontSize='14px'>
          {t('betterPrice')}{' '}
          <StyledInternalLink href={linkDestination}>
            <b>Uniswap {version.toUpperCase()} ↗</b>
          </StyledInternalLink>
        </Text>
      </AutoColumn>
    </YellowCard>
  )
}
