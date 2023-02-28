const nft1 = 'https://gateway.pinata.cloud/ipfs/QmNZuNGKW9oqx6dfVwV6X9jCCdUrGZfcZD4jBYXZxfMJjj'
const nft2 = 'https://gateway.pinata.cloud/ipfs/QmdqoZhSvpu98ViJXGxBtcmTt5ZUCWBG2co3qBWTCD2yne'
const nft3 = 'https://gateway.pinata.cloud/ipfs/QmepixECjxmmoRcE2or9jNDKcyhgNerutjMFcGsKADDCjV'

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
    img: nft1,
    headline: 'Smart NFT Pool A',
    cards: '0',
    cost: '100 000 BUSD',
    tokens: '1 000 000 YET',
    price: 100000,
  },
  {
    img: nft2,
    headline: 'Smart NFT Pool B',
    cards: '0',
    cost: '50 000 BUSD',
    tokens: '400 000 YET',
    price: 50000,
  },
  {
    img: nft3,
    headline: 'Smart NFT Pool C',
    cards: '0',
    cost: '15 000 BUSD',
    tokens: '100 000 YET',
    price: 15000,
  },
].map((item, i) => ({ ...item, id: i })) as Array<CardType>

export default cardList
