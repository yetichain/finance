import { TransactionsQuery } from '../generated'

export enum TransactionType {
  ALL = 'all',
  SWAP = 'swap',
  MINT = 'mint',
  BURN = 'burn',
}

export interface TransactionData {
  hash: string
  type: TransactionType
  timestamp: number
  sender: string
  token0Symbol: string
  token1Symbol: string
  token0Address: string
  token1Address: string
  amountUSD: number
  amountToken0: number
  amountToken1: number
}

export function mapSwap(swap: TransactionsQuery['swaps'][0]): TransactionData {
  return {
    hash: swap.id.split('-')[0],
    type: TransactionType.SWAP,
    timestamp: Number(swap.timestamp),
    sender: swap.from,
    token0Symbol: swap.pair.token0.symbol,
    token1Symbol: swap.pair.token1.symbol,
    token0Address: swap.pair.token0.id,
    token1Address: swap.pair.token1.id,
    amountUSD: Number(swap.amountUSD),
    amountToken0: Number(swap.amount0In) - Number(swap.amount0Out),
    amountToken1: Number(swap.amount1In) - Number(swap.amount1Out),
  }
}

export function mapMint(mint: TransactionsQuery['mints'][0]): TransactionData {
  return {
    type: TransactionType.MINT,
    hash: mint.id.split('-')[0],
    timestamp: Number(mint.timestamp),
    sender: mint.to,
    token0Symbol: mint.pair.token0.symbol,
    token1Symbol: mint.pair.token1.symbol,
    token0Address: mint.pair.token0.id,
    token1Address: mint.pair.token1.id,
    amountUSD: Number(mint.amountUSD),
    amountToken0: Number(mint.amount0),
    amountToken1: Number(mint.amount1),
  }
}

export function mapBurn(burn: TransactionsQuery['burns'][0]): TransactionData {
  return {
    type: TransactionType.BURN,
    hash: burn.id.split('-')[0],
    timestamp: Number(burn.timestamp),
    sender: burn.sender,
    token0Symbol: burn.pair.token0.symbol,
    token1Symbol: burn.pair.token1.symbol,
    token0Address: burn.pair.token0.id,
    token1Address: burn.pair.token1.id,
    amountUSD: Number(burn.amountUSD),
    amountToken0: Number(burn.amount0),
    amountToken1: Number(burn.amount1),
  }
}
