import { Card, CardBody, Heading, Skeleton, Text } from 'alium-uikit/src'
import { useGetStats } from 'hooks/api'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'

const StyledTotalValueLockedCard = styled(Card)`
  border-radius: 6px;
`

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid #f4f5fa;
  margin: 20px 0;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Text
          style={{ fontSize: '18px', lineHeight: '24px', letterSpacing: '0.3px', color: '#0B1359', fontWeight: 'bold' }}
        >
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Text>
        <Divider />
        {data ? (
          <>
            <Heading size='xl' color='#24BA7B' mb='16px'>{`$${tvl}`}</Heading>
            <Text color='#8990A5'>{TranslateString(764, 'Across all LPs')}</Text>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
