import { ChainId, WETH } from '@alium-official/sdk'
import { Contract } from '@ethersproject/contracts'
import AbiAliumFactory from 'config/abi/AbiAliumFactory.json'
import farmingTicketWindow from 'config/abi/FarmingTicketWindow.json'
import masterChef from 'config/abi/masterchef.json'
import MULTICALL_ABI from 'config/abis/MULTICALL_ABI.json'
import MULTICALL_ADDRESS from 'config/addresses/MULTICALL_ADDRESS'
import { SHP_ABI, SHP_NFT_ABI } from 'config/constants/shp'
import LP_ABI from 'config/vampiring/LP_ABI.json'
import { VAMPIRE_ABI } from 'config/vampiring/VAMPIRE_ABI'
import { getNetworkLibrary } from 'connectors'
import ERC20_ABI from 'constants/abis/erc20'
import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from 'constants/abis/migrator'
import { NFT_ABI, NFT_COLLECTIBLE_ABI, NFT_COLLECTIBLE_ADDRESS, NFT_PRIVATE_ADDRESS } from 'constants/abis/nftPrivate'
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from 'constants/v1'
import { useMemo } from 'react'
import { getContract } from 'utils'
import {
  getBep20Contract,
  getCakeContract,
  getClaimRefundContract,
  getIfoContract,
  getLotteryContract,
  getLotteryTicketContract,
  getPointCenterIfoContract,
  getProfileContract,
  getSouschefContract,
} from 'utils/contractHelpers'
import { ENS_ABI, ENS_PUBLIC_RESOLVER_ABI, ERC20_BYTES32_ABI, IPAIR_ABI, WETH_ABI } from '../config/abis'
import UNISOCKS_ABI from '../constants/abis/unisocks.json'
import { getFarmingTicketWindow, getMasterChefAddress, getShpAddress } from './../utils/addressHelpers'
import { useActiveWeb3React } from './index'
import useWeb3 from './useWeb3'

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()
  const activeLibrary = useMemo(() => library || getNetworkLibrary(), [library])
  return useMemo(() => {
    if (!address || !ABI) return null
    try {
      return getContract(address, ABI, activeLibrary, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [ABI, account, address, activeLibrary, withSignerIfPossible])
}

export function useFactoryContract(address: string): Contract | null {
  return useContract(address, AbiAliumFactory)
}

export function useVampireContract(address: string): Contract | null {
  return useContract(address, VAMPIRE_ABI, true)
}

export function useV1FactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && V1_FACTORY_ADDRESSES[chainId], V1_FACTORY_ABI, false)
}

export function useV2MigratorContract(): Contract | null {
  return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true)
}

export function useNFTPrivateContract(): Contract | null {
  return useContract(NFT_PRIVATE_ADDRESS, NFT_ABI, true)
}

export function useCollectibleContract(): Contract | null {
  return useContract(NFT_COLLECTIBLE_ADDRESS, NFT_COLLECTIBLE_ABI, true)
}

export function useV1ExchangeContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, V1_EXCHANGE_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useLPTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, LP_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.BSCTESTNET:
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IPAIR_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_ADDRESS[chainId], MULTICALL_ABI, false)
}
export function useSocksController(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? '0x65770b5283117639760beA3F867b69b3697a91dd' : undefined,
    UNISOCKS_ABI,
    false,
  )
}

export const useIfoContract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoContract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const useCake = () => {
  const web3 = useWeb3()
  return useMemo(() => getCakeContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const contract = useContract(getMasterChefAddress(), masterChef)
  return useMemo(() => contract, [contract])
}
export const useFarmingTicketWindow = () => {
  const contract = useContract(getFarmingTicketWindow(), farmingTicketWindow)
  return useMemo(() => contract, [contract])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export function useShpContract() {
  return useContract(getShpAddress(), SHP_ABI)
}

export function useShpNftContract(address?: string) {
  return useContract(address, SHP_NFT_ABI)
}
