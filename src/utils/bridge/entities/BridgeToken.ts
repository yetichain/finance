/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { BigintIsh, Token, TokenAmount } from '@alium-official/sdk'
import { BigNumber } from 'ethers'

export type BridgeTokenMode = 'erc677' | 'erc20' | 'NATIVE' | 'dedicated-erc20' | ''

export interface BridgeTokenObject {
  address: string
  chainId: number
  decimals: number
  mediator: string
  mode: BridgeTokenMode
  name: string
  symbol: string
  helperContractAddress?: string
  totalSupply?: BigNumber
}

export type BridgeTokenWithoutMode = Omit<BridgeTokenObject, 'decimals' | 'mediator' | 'mode' | 'helperContractAddress'>

export type BridgeTokenOrParams = BridgeToken | Pick<BridgeToken, 'address' | 'chainId' | 'totalSupply'>

export class BridgeToken extends Token {
  public readonly mediator: string
  public readonly mode: BridgeTokenMode
  public readonly helperContractAddress: string
  public readonly totalSupply?: BigNumber
  constructor(_token: BridgeTokenObject) {
    const { mode = '', mediator = '', helperContractAddress = '', totalSupply = BigNumber.from(0), ...other } = _token

    super(other.chainId, other.address, other.decimals, other.symbol, other.name)
    this.mediator = mediator
    this.mode = mode
    this.helperContractAddress = helperContractAddress
    this.totalSupply = BigNumber.from(totalSupply)
  }

  // return all default fields
  get raw(): BridgeTokenObject {
    return {
      name: this.name,
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      mediator: this.mediator,
      mode: this.mode,
      symbol: this.symbol,
      helperContractAddress: this.helperContractAddress,
      totalSupply: this.totalSupply,
    }
  }
}

export class BridgeTokenAmount extends TokenAmount {
  public readonly token: Token
  public constructor(token: BridgeToken, amount: BigintIsh) {
    super(token, amount)
    this.token = token
  }
}
