import { PopupCheckIcon, PopupFailIcon } from 'alium-uikit/src'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { getExplorerLink, useExplorerName } from 'utils'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import { ExternalLink, TYPE } from '../Shared'

const { body: Body } = TYPE

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { explorerName } = useExplorerName(chainId)
  const theme = useContext(ThemeContext)

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? (
          <PopupCheckIcon color={theme.colors.success} width='40px' height='40px' />
        ) : (
          <PopupFailIcon color={theme.colors.failure} width='40px' height='40px' />
        )}
      </div>
      <AutoColumn gap='8px'>
        <Body fontWeight={500} style={{ fontWeight: 500 }}>
          {summary ?? `Hash: ${hash.slice(0, 8)}...${hash.slice(58, 65)}`}
        </Body>
        {chainId && (
          <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')}>
            {t('View on {{explorerName}}', { explorerName })}
          </ExternalLink>
        )}
      </AutoColumn>
    </RowNoFlex>
  )
}
