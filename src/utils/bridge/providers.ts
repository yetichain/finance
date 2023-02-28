import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { LOCAL_STORAGE_KEYS } from 'constants/bridge/bridge.constants'
import { ethers } from 'ethers'
import memoize from 'fast-memoize'
import { getNetworkLabel, getRPCUrl, logError } from 'utils/bridge/helpers'

const {
  MAINNET_RPC_URL,
  KOVAN_RPC_URL,
  BSC_RPC_URL,
  BSC_TESTNET_RPC_URL,
  HECO_RPC_URL,
  POLYGON_TESTNET_RPC_URL,
  POLYGON_RPC_URL,
  SOKOL_RPC_URL,
  XDAI_RPC_URL,
  ROPSTEN_TESTNET_RPC_URL,
  RINKEBY_TESTNET_RPC_URL,
} = LOCAL_STORAGE_KEYS

const RPC_URL = {
  1: MAINNET_RPC_URL,
  3: ROPSTEN_TESTNET_RPC_URL,
  4: RINKEBY_TESTNET_RPC_URL,
  42: KOVAN_RPC_URL,
  56: BSC_RPC_URL,
  77: SOKOL_RPC_URL,
  100: XDAI_RPC_URL,
  256: HECO_RPC_URL,
  97: BSC_TESTNET_RPC_URL,
  80001: POLYGON_TESTNET_RPC_URL,
  137: POLYGON_RPC_URL,
}

const NETWORK_TIMEOUT = 1000

const memoized = memoize((url) => new ethers.providers.StaticJsonRpcProvider(url))

const checkRPCHealth = async (url: string) => {
  if (!url) return null
  const tempProvider = memoized(url)
  if (!tempProvider) return null
  try {
    await Promise.race([
      // eslint-disable-next-line no-underscore-dangle
      tempProvider._networkPromise,
      setTimeout(() => Promise.reject(new Error('Network timeout')).catch(() => null), NETWORK_TIMEOUT),
    ])
    return tempProvider
  } catch (err) {
    logError({ providerSetError: err.message })
    return null
  }
}

export const getEthersProvider = async (chainId: number): Promise<StaticJsonRpcProvider | null> => {
  const label = getNetworkLabel(chainId).toUpperCase()
  const sessionHealthyURL = `HEALTHY-RPC-URL-${label}`
  const localRPCUrl = window.localStorage.getItem(RPC_URL[chainId])
  const currentRPCUrls = getRPCUrl(chainId, true)
  const rpcURLs = localRPCUrl?.length > 0 ? [localRPCUrl, ...currentRPCUrls] : currentRPCUrls

  const provider =
    (await checkRPCHealth(sessionStorage.getItem(sessionHealthyURL))) ||
    ((
      await Promise.all(
        rpcURLs.map((item) => {
          return checkRPCHealth(item)
        }),
      )
    ).filter((p) => !!p)[0] as StaticJsonRpcProvider)
  sessionStorage.setItem(sessionHealthyURL, provider?.connection?.url)
  const providerExist = provider?.connection?.url && provider?.connection?.url !== 'undefined'
  return providerExist ? provider : null
}

export const isEIP1193 = (ethersProvider: StaticJsonRpcProvider) =>
  ethersProvider?.connection?.url?.includes('eip-1193')
