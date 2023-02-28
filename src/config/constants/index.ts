import { getFarmsConfig } from './farms/farms'

const communityFarms = getFarmsConfig()
  .filter((farm) => farm.isCommunity)
  .map((farm) => farm.lpSymbol)

export { default as ifosConfig } from './ifo'
export { default as poolsConfig } from './pools'
export { communityFarms }
