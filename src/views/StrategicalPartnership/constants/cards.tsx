// import strategicalIcon from '../images/StrategicalCardIcon.svg'

const cardLink = 'https://gateway.pinata.cloud/ipfs/QmTVgjsjv4hMiaNtZzX7Fj4zs8WAjz2SktsY3C7qsSFjQW'

export interface CardType {
  id: number
  img: string
  headline: string
  cards: string
  cost: string
  tokens: string
  price: number
}

const cardList = [
  {
    img: cardLink,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
  },
].map((item, i) => ({ ...item, id: i })) as Array<CardType>

export default cardList
