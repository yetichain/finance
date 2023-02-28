// const nft1 = '/images/nft/legendary-illustris.gif'
// const nft2 = '/images/nft/epic-castus.gif'
// const nft3 = '/images/nft/rare-altum.gif'
// const nft4 = '/images/nft/uncommon-regno.gif'
// const nft5 = '/images/nft/common-necesse.gif'

const nft1 = '/video/nft/legendary-illustris.mp4'
const nft2 = '/video/nft/epic-castus.mp4'
const nft3 = '/video/nft/rare-altum.mp4'
const nft4 = '/video/nft/uncommon-regno.mp4'
const nft5 = '/video/nft/common-necesse.mp4'
const private2 = '/images/nft/private-2.gif'
const private3 = '/images/nft/private-3.gif'
const strategy1 = '/images/nft/strategy-1.gif'
// import strategicalIcon from '../images/StrategicalCardIcon.svg'

// const cardLink = 'https://gateway.pinata.cloud/ipfs/QmTVgjsjv4hMiaNtZzX7Fj4zs8WAjz2SktsY3C7qsSFjQW'

export interface CardType {
  id: number
  img: string
  headline: string
  cards: string
  cost: string
  tokens: string
  price: number
  privateCall: boolean
  cardsCount: number
}

export const cardListPublic: CardType[] = [
  {
    id: 6,
    img: nft5,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: false,
    cardsCount: 0,
  },
  {
    id: 7,
    img: nft4,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: false,
    cardsCount: 0,
  },
  {
    id: 8,
    img: nft3,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: false,
    cardsCount: 0,
  },
  {
    id: 9,
    img: nft2,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: false,
    cardsCount: 0,
  },
  {
    id: 10,
    img: nft1,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: false,
    cardsCount: 0,
  },
]
export const cardListStrategical: CardType[] = [
  {
    id: 5,
    img: strategy1,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: true,
    cardsCount: 0,
  },
]
export const cardListPrivate: CardType[] = [
  {
    id: 1,
    img: 'https://gateway.pinata.cloud/ipfs/QmNZuNGKW9oqx6dfVwV6X9jCCdUrGZfcZD4jBYXZxfMJjj',
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: true,
    cardsCount: 0,
  },
  {
    id: 2,
    img: private2,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: true,
    cardsCount: 0,
  },
  {
    id: 3,
    img: private3,
    headline: 'Strategical Partnership',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '575 000 YET',
    price: 100000,
    privateCall: true,
    cardsCount: 0,
  },
]
