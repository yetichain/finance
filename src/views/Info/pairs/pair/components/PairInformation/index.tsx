import { ChainId } from '@alium-official/sdk'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { Button, typography } from 'ui'
import { getExplorerLink } from 'utils'
import CopyableAddress from 'views/Info/components/CopyableAddress'
import InformationTable from 'views/Info/components/InformationTable'
import Table from 'views/Info/components/Table'
import { PairQueryData } from 'views/Info/types'
import { formatTokenSymbol } from 'views/Info/utils'
import { getPairName } from 'views/Info/utils/pairs'

export interface PairInformationProps {
  pair: PairQueryData
}

export default function PairInformation({ pair }: PairInformationProps) {
  const { t } = useTranslation()
  return (
    <PairInformation.Root
      title={t('Pair Information')}
      items={[
        {
          title: t('Pair name'),
          value: <PairInformation.Name>{getPairName(pair.token0.symbol, pair.token1.symbol)}</PairInformation.Name>,
        },
        {
          title: t('Pair address'),
          value: <CopyableAddress address={pair.id} />,
        },
        {
          title: t('{{token}} address', { token: formatTokenSymbol(pair.token0.symbol) }),
          value: <CopyableAddress address={pair.token0.id} />,
        },
        {
          title: t('{{token}} address', { token: formatTokenSymbol(pair.token1.symbol) }),
          value: <CopyableAddress address={pair.token1.id} />,
        },
      ]}
      actions={
        <Button
          as='a'
          href={getExplorerLink(ChainId.MAINNET, pair.id, 'address')}
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

PairInformation.Name = styled.div`
  ${typography.ultrasmall.medium}
  color: #6C5DD3;
`

PairInformation.Root = styled(InformationTable)`
  ${Table.Row} {
    grid-template-columns: 1fr 1.5fr 1.5fr 3fr;
  }
`
