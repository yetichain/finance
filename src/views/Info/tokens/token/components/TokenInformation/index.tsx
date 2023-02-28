import { ChainId } from '@alium-official/sdk'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { Button, typography } from 'ui'
import { getExplorerLink } from 'utils'
import CopyableAddress from 'views/Info/components/CopyableAddress'
import InformationTable from 'views/Info/components/InformationTable'
import Table from 'views/Info/components/Table'
import { TokenQueryData } from 'views/Info/types'
import { formatTokenSymbol } from 'views/Info/utils'

export interface TokenInformationProps {
  token: TokenQueryData
}

export default function TokenInformation({ token }: TokenInformationProps) {
  const { t } = useTranslation()
  return (
    <TokenInformation.Root
      title={t('Token Information')}
      items={[
        {
          title: t('Symbol'),
          value: <TokenInformation.TokenSymbol>{formatTokenSymbol(token.symbol)}</TokenInformation.TokenSymbol>,
        },
        {
          title: t('Name'),
          value: token.name,
        },
        {
          title: t('Address'),
          value: <CopyableAddress address={token.id} />,
        },
      ]}
      actions={
        <Button
          as='a'
          href={getExplorerLink(ChainId.MAINNET, token.id, 'token')}
          target='_blank'
          rel='noreferrer noopener'
          variant='outlined'
          size='small'
        >
          {t('View on BscScan')}
        </Button>
      }
    />
  )
}

TokenInformation.TokenSymbol = styled.div`
  ${typography.ultrasmall.medium}
  color: #6C5DD3;
`

TokenInformation.Root = styled(InformationTable)`
  ${Table.Row} {
    grid-template-columns: repeat(2, 1fr) 4fr;
  }
`
