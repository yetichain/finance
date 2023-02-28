import { ArrowForwardIcon, Card, Flex, Heading } from 'alium-uikit/src'
import pools from 'config/constants/pools'
import orderBy from 'lodash/orderBy'
import { Pool } from 'state/types'
import styled from 'styled-components'

const StyledFarmStakingCard = styled(Card)`
  background: transparent;
  border-radius: 6px;
  border: 1px solid #ff72ac;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid #ff72ac;
`

const Box = styled.div`
  padding: 24px;
`

const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #ff72ac;
`
const EarnAssetCard = () => {
  const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.tokenName.includes('CAKE'))
  const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include CAKE
  const assets = ['YET, BRY, Zee, SWGb', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <Flex justifyContent='space-between' padding='24px'>
        <Heading color='contrast' style={{ lineHeight: '24px', fontSize: '18px', letterSpacing: '0.3px' }}>
          Earn
        </Heading>
        <ArrowForwardIcon color='#FF72AC' />
      </Flex>
      <Divider />
      <Box>
        <CardMidContent>{assets}</CardMidContent>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading
            color='#8990A5'
            style={{
              lineHeight: '20px',
              fontSize: '16px',
              letterSpacing: '0.3px',
              fontWeight: 'normal',
              marginTop: '5px',
            }}
          >
            in Pools
          </Heading>
        </Flex>
      </Box>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
