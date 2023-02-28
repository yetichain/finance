import { Token, TokenAmount, WETH } from '@alium-official/sdk'
import { Button, Text } from 'alium-uikit/src'
import { NextLink } from 'components/NextLink'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'react-i18next'
import { ROUTES } from 'routes'
import { AutoColumn } from '../Column'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { FixedHeightRow, HoverCard } from './index'

interface PositionCardProps {
  token: Token
  V1LiquidityBalance: TokenAmount
}

function V1PositionCard({ token, V1LiquidityBalance }: PositionCardProps) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  return (
    <HoverCard>
      <AutoColumn gap='12px'>
        <FixedHeightRow>
          <RowFixed>
            <DoubleCurrencyLogo currency0={token} margin size={20} />
            <Text fontSize='20px' style={{ marginLeft: '' }}>
              {`${chainId && token.equals(WETH[chainId]) ? 'WETH' : token.symbol}/ETH`}
            </Text>
            <Text fontSize='12px' ml='0.5rem' px='0.75rem' py='0.25rem' style={{ borderRadius: '1rem' }} color='black'>
              V1
            </Text>
          </RowFixed>
        </FixedHeightRow>

        <AutoColumn gap='8px'>
          <RowBetween marginTop='10px'>
            <NextLink href={`/migrate/v1/${V1LiquidityBalance.token.address}`}>
              <Button style={{ width: '68%' }}>Migrate</Button>
            </NextLink>
            <NextLink href={ROUTES.removeByMultiple('v1', `${V1LiquidityBalance.token.address}`)}>
              <Button variant='secondary' style={{ width: '28%' }}>
                {t('Remove')}
              </Button>
            </NextLink>
          </RowBetween>
        </AutoColumn>
      </AutoColumn>
    </HoverCard>
  )
}

export default V1PositionCard
