import { Flex, Heading, Text } from 'alium-uikit/src'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PoolsTypes } from '../../constants/pools'
import CardRow from './CardRow'

interface NftCollectionCardProps {
  pool: PoolsTypes
  selectedCard: [number, number] | null
  onSelectCard: (pid: number, cid: number, from: number) => void
}

const NftCollectionCardWrap = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #ffffff;
  border-radius: 6px;
  width: 100%;
  padding: 24px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 16px;
  }
`

const Field = styled(Flex)<{ maxWidth: string }>`
  font-style: normal;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: #0b1359;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  flex: 1;
  @media (max-width: 1024px) {
    max-width: unset;
  }
`

const FieldPool = styled(Field)`
  flex-direction: column;
  text-align: left;
  margin-right: 16px;
  @media (max-width: 1024px) {
    margin-right: 0;
    margin-bottom: 24px;
    padding: 0;
  }
`

const FieldPoolDescription = styled(Flex)`
  margin-top: 8px;
  flex-direction: row;
`

const FieldCards = styled(Field)`
  width: 100%;
  justify-content: flex-start;
  flex: 1;
  @media (max-width: 568px) {
    flex-direction: column;
  }
`

const TotalCards = styled(Flex)`
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  width: 80px;
  height: 80px;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 60px;
  margin-right: 24px;
  @media (max-width: 1024px) {
    width: 64px;
    height: 64px;
  }
  @media (max-width: 568px) {
    width: fit-content;
    height: 32px;
    flex-direction: row;
    padding: 6px 12px;
    box-sizing: border-box;
    margin-right: 0;
    margin-bottom: 16px;
    & > div:first-child {
      margin-right: 8px;
    }
  }
`

function NftCollectionCard({ pool, selectedCard, onSelectCard }: NftCollectionCardProps) {
  const [multiRows, setMultiRows] = useState(false)
  const [cards, setCards] = useState<number[]>([])
  const fieldCards = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    setCards(pool?.cards || [])
  }, [pool])
  useEffect(() => {
    if (fieldCards.current) {
      const cardRowWidth = fieldCards.current.offsetWidth
      setMultiRows(cardRowWidth <= 472 && cards.length > 10)
    }
  }, [fieldCards.current?.offsetWidth, cards])

  return (
    <NftCollectionCardWrap>
      <FieldPool maxWidth='270px'>
        <Heading as='h3' size='lg' color='#0B1359'>
          {pool.name}
        </Heading>
        <FieldPoolDescription>
          <Text fontSize='14' color='#8990A5'>
            {pool.description}
          </Text>
        </FieldPoolDescription>
      </FieldPool>
      <FieldCards ref={fieldCards} maxWidth='unset'>
        <TotalCards>
          <Text>{pool.cards?.length || 0} </Text>
          <Text>cards</Text>
        </TotalCards>
        {multiRows ? (
          <>
            <CardRow
              pool={pool}
              selectedCard={selectedCard}
              onSelectCard={onSelectCard}
              cards={cards.slice(0, cards.length / 2)}
            />
            <CardRow
              pool={pool}
              selectedCard={selectedCard}
              onSelectCard={onSelectCard}
              cards={cards.slice(cards.length / 2)}
            />
          </>
        ) : (
          <CardRow pool={pool} selectedCard={selectedCard} onSelectCard={onSelectCard} cards={cards} />
        )}
      </FieldCards>
    </NftCollectionCardWrap>
  )
}

export default NftCollectionCard
