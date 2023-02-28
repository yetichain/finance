import { Flex } from 'alium-uikit/src'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PoolsTypes } from '../../constants/pools'
const card1One = '/images/collection/Card-01.png'
const card1Two = '/images/collection/Card-02.png'
const card1Three = '/images/collection/Card-03.png'

interface CardRowProps {
  pool: PoolsTypes
  selectedCard: [number, number] | null
  onSelectCard: (pid: number, cid: number, from: number) => void
  cards: number[]
}

const CardRowWrap = styled(Flex)`
  position: relative;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: calc(100% - 112px);
  @media (max-width: 1024px) {
    width: calc(100% - 88px);
  }
  @media (max-width: 568px) {
    width: 100%;
    min-height: 95px;
  }
`

// const Card = styled(Flex)`
const Card = styled.div<{ index: number; margin: number; active: boolean }>`
  position: absolute;
  width: 66px;
  height: 70px;
  padding: 4px;
  box-sizing: border-box;
  top: 50%;
  left: ${({ index, margin }) => `${index * margin}px`};
  transition: all 0.25s ease-out;
  cursor: pointer;
  z-index: ${({ active }) => (active ? '1000' : '0')};
  transform: ${({ active }) =>
    active ? 'rotate(-35deg) translate(55%, -55%)' : 'rotate(-35deg) translate(35%, -35%)'};
  img {
    position: absolute;
    top: 0;
    left: 0;
  }
  span {
    font-weight: 900;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 0.3px;
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: #ffffff;
  }
  &:hover {
    z-index: 1000;
    transform: rotate(-35deg) translate(55%, -55%);
    & ~ div,
    & + div {
      pointer-events: none;
    }
  }
`

function CardRow({ selectedCard, onSelectCard, cards, pool }: CardRowProps) {
  const cardRow = useRef<HTMLHeadingElement>(null)
  const [margin, setMargin] = useState(66)
  useEffect(() => {
    if (cardRow.current) {
      const cardRowWidth = cardRow.current.offsetWidth
      const oneCard = (cardRowWidth - 66) / cards.length
      setMargin(oneCard >= 66 ? 66 : oneCard)
    }
  }, [cardRow.current?.offsetWidth, cards.length])

  return (
    <CardRowWrap ref={cardRow}>
      {cards.map((card, id) => {
        let imgSrc: string
        if ((id + 1) % 3 === 0 && id > 0) {
          imgSrc = card1Three
        } else if ((id + 2) % 3 === 0) {
          imgSrc = card1Two
        } else {
          imgSrc = card1One
        }
        return (
          <Card
            onClick={(el: any) => {
              onSelectCard(pool.id, card, el.target.getBoundingClientRect().top)
            }}
            active={selectedCard?.[0] === pool.id && selectedCard?.[1] === card}
            margin={margin}
            index={id}
            key={`${pool.name}-${card}`}
          >
            <img src={imgSrc} alt='' />
            <span>{card}</span>
          </Card>
        )
      })}
    </CardRowWrap>
  )
}

export default CardRow
