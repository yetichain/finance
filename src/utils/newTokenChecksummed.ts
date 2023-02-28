import { ChainId, Token } from '@alium-official/sdk'
import { utils } from 'ethers'

export const newTokenChecksummed = (
  chainId: ChainId,
  address: string,
  decimals: number,
  symbol?: string,
  name?: string,
) => new Token(chainId, utils.getAddress(address), decimals, symbol, name)
