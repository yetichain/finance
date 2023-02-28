import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { ADDRESS_ZERO } from 'constants/bridge/bridge.constants'
import { ENABLED_BRIDGES_ENUMS_TYPE, networks } from 'constants/bridge/bridge.networks'
import { BigNumber, Contract, utils } from 'ethers'
import { BridgeToken, BridgeTokenMode, BridgeTokenOrParams } from './entities/BridgeToken'
import { getMediatorAddress, getMediatorAddressWithoutOverride, logError } from './helpers'
import { getOverriddenMode, isOverridden } from './overrides'
import { getEthersProvider } from './providers'

export const fetchAllowance = async (
  { mediator, address }: BridgeToken | null,
  account: string,
  ethersProvider: Web3Provider,
): Promise<BigNumber> => {
  if (!account || !address || address === ADDRESS_ZERO || !mediator || mediator === ADDRESS_ZERO || !ethersProvider) {
    return BigNumber.from(0)
  }

  try {
    const abi = ['function allowance(address, address) view returns (uint256)']
    const tokenContract = new Contract(address, abi, ethersProvider)
    return tokenContract.allowance(account, mediator)
  } catch (allowanceError) {
    logError({ allowanceError })
  }
  return BigNumber.from(0)
}

const fetchMode = async (
  bridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE,
  token: BridgeTokenOrParams,
): Promise<BridgeTokenMode> => {
  if (isOverridden(bridgeDirection, token)) {
    return getOverriddenMode(bridgeDirection, token)
  }
  const { enableReversedBridge, homeChainId } = networks[bridgeDirection]
  if (!enableReversedBridge) {
    return token.chainId === homeChainId ? 'erc677' : 'erc20'
  }

  const ethersProvider = await getEthersProvider(token.chainId)
  const mediatorAddress = getMediatorAddressWithoutOverride(bridgeDirection, token.chainId)
  const abi = ['function nativeTokenAddress(address) view returns (address)']
  const mediatorContract = new Contract(mediatorAddress, abi, ethersProvider)
  const nativeTokenAddress = await mediatorContract.nativeTokenAddress(token.address)
  if (nativeTokenAddress === ADDRESS_ZERO) return 'erc20'
  return 'erc677'
}

export const fetchTokenName = async (token: BridgeToken | { chainId: number; address: string; name?: string }) => {
  const ethersProvider = await getEthersProvider(token.chainId)
  let tokenName = token?.name || ''

  try {
    const stringAbi = ['function name() view returns (string)']
    const tokenContractString = new Contract(token.address, stringAbi, ethersProvider)
    tokenName = await tokenContractString.name()
  } catch {
    const bytes32Abi = ['function name() view returns (bytes32)']
    const tokenContractBytes32 = new Contract(token.address, bytes32Abi, ethersProvider)
    tokenName = utils.parseBytes32String(await tokenContractBytes32.name())
  }
  return tokenName
}

export const fetchTokenSymbol = async (toAddress: string, toChainId: number) => {
  const ethersProvider = await getEthersProvider(toChainId)
  let tokenSymbol
  try {
    const stringAbi = ['function symbol() view returns (string)']
    const tokenContractString = new Contract(toAddress, stringAbi, ethersProvider)
    tokenSymbol = await tokenContractString.symbol()
  } catch {
    const bytes32Abi = ['function symbol() view returns (bytes32)']
    const tokenContractBytes32 = new Contract(toAddress, bytes32Abi, ethersProvider)
    tokenSymbol = utils.parseBytes32String(await tokenContractBytes32.symbol())
  }
  return tokenSymbol || ''
}

export const fetchTokenTotalSupply = async (toAddress: string, toChainId: number): Promise<BigNumber> => {
  const ethersProvider = await getEthersProvider(toChainId)

  try {
    const stringAbi = ['function totalSupply() external view returns (uint256)']
    const tokenContractString = new Contract(toAddress, stringAbi, ethersProvider)
    const totalSupply = await tokenContractString.totalSupply()
    return totalSupply
  } catch {
    return BigNumber.from(0)
  }
}

export const fetchTokenDetailsBytes32 = async (token: BridgeTokenOrParams) => {
  const ethersProvider = await getEthersProvider(token.chainId)
  const abi = [
    'function decimals() view returns (uint8)',
    'function symbol() view returns (bytes32)',
    'function name() view returns (bytes32)',
    'function totalSupply() external view returns (uint256)',
  ]
  const tokenContract = new Contract(token.address, abi, ethersProvider)
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    tokenContract.name(),
    tokenContract.symbol(),
    tokenContract.decimals() as number,
    tokenContract.totalSupply() as BigNumber,
  ])
  return {
    name: utils.parseBytes32String(name),
    symbol: utils.parseBytes32String(symbol),
    decimals,
    totalSupply,
  }
}

export const fetchTokenDetailsString = async (token: BridgeTokenOrParams) => {
  const ethersProvider = await getEthersProvider(token.chainId)
  const abi = [
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    'function name() view returns (string)',
    'function totalSupply() external view returns (uint256)',
  ]
  const tokenContract = new Contract(token.address, abi, ethersProvider)

  const [name, symbol, decimals, totalSupply] = await Promise.all([
    tokenContract.name() as string,
    tokenContract.symbol() as string,
    tokenContract.decimals() as number,
    tokenContract.totalSupply() as BigNumber,
  ])

  return { name, symbol, decimals, totalSupply }
}

const fetchTokenDetailsFromContract = async (token: BridgeTokenOrParams) => {
  try {
    return await fetchTokenDetailsString(token)
  } catch {
    return await fetchTokenDetailsBytes32(token)
  }
}

export const fetchTokenDetails = async (bridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE, token: BridgeTokenOrParams) => {
  // @ts-ignore
  const mediatorAddress = getMediatorAddress(bridgeDirection, token)
  const [{ name, symbol, decimals, totalSupply }, mode] = await Promise.all([
    fetchTokenDetailsFromContract(token),
    fetchMode(bridgeDirection, token),
  ])

  return new BridgeToken({
    ...token,
    name,
    symbol,
    decimals: Number(decimals),
    mode,
    mediator: mediatorAddress,
    totalSupply,
  })
}

export const approveToken = async (
  ethersProvider: StaticJsonRpcProvider,
  { address, mediator }: BridgeToken,
  amount: BigNumber,
) => {
  const abi = ['function approve(address, uint256)']
  const tokenContract = new Contract(address, abi, ethersProvider.getSigner())
  return tokenContract.approve(mediator, amount)
}

export const fetchTokenBalance = async (token: BridgeToken, account: string) => {
  const ethersProvider = await getEthersProvider(token.chainId)
  return fetchTokenBalanceWithProvider(ethersProvider, token, account)
}

export const fetchTokenBalanceWithProvider = async (
  ethersProvider: StaticJsonRpcProvider,
  { address, mode }: BridgeToken,
  account: string,
): Promise<BigNumber> => {
  if (address === ADDRESS_ZERO && mode === 'NATIVE') {
    return ethersProvider.getBalance(account)
  }
  if (!account || !address || address === ADDRESS_ZERO || !ethersProvider) {
    return BigNumber.from(0)
  }
  try {
    const abi = ['function balanceOf(address) view returns (uint256)']
    const tokenContract = new Contract(address, abi, ethersProvider)
    const balance = await tokenContract.balanceOf(account)
    return balance
  } catch (error) {
    logError({ balanceError: error })
  }

  return BigNumber.from(0)
}
