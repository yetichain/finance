import { ChainId } from '@alium-official/sdk'

export const LP_HOLDERS_FEE = 0.0017
export const TOTAL_FEE = 0.003

export const PAGE_LIMIT = 10

export interface ApiSource {
  chainIds: number[]
  url: string
  blocklytics: string
}

export const sources: ApiSource[] = [
  {
    chainIds: [ChainId.MAINNET, ChainId.BSCTESTNET],
    url: 'https://api.studio.thegraph.com/query/1712/alium-exchange-bsc/0.1.5',
    blocklytics: 'https://api.thegraph.com/subgraphs/name/venomprotocol/bsc-blocks',
  },
]

export function getSourceByChainId(chainId: number) {
  return sources.find((source) => source.chainIds.includes(chainId))
}
