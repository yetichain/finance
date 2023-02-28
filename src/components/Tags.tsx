import { BinanceIcon, CommunityIcon, Tag, VerifiedIcon } from 'alium-uikit/src'

const CoreTag = () => (
  <Tag variant='secondary' outline startIcon={<VerifiedIcon />}>
    Core
  </Tag>
)

const CommunityTag = () => (
  <Tag variant='textSubtle' outline startIcon={<CommunityIcon />}>
    Community
  </Tag>
)

const BinanceTag = () => (
  <Tag variant='binance' outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)

export { CoreTag, CommunityTag, BinanceTag }
