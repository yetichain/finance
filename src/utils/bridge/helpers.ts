import { BigintIsh } from '@alium-official/sdk'
import { Web3Provider } from '@ethersproject/providers'
import {
  chainUrls,
  defaultTokensUrl,
  LOCAL_STORAGE_KEYS,
  nativeCurrencies,
  nativeCurrencyMediators,
  networkCurrencies,
  networkLabels,
  networkNames,
} from 'constants/bridge/bridge.constants'
import {
  BSC_HECO_BRIDGE,
  BSC_POLYGON_BRIDGE,
  BSC_POLYGON_TEST_BRIDGE,
  BSC_RINKEBY_BRIDGE,
  BSC_ROPSTEN_BRIDGE,
  BSC_XDAI_BRIDGE,
  defaultTokens,
  ENABLED_BRIDGES_ENUMS_TYPE,
  ETH_BSC_BRIDGE,
  ETH_XDAI_BRIDGE,
  KOVAN_SOKOL_BRIDGE,
  networks,
} from 'constants/bridge/bridge.networks'
import { BigNumber, utils } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { BridgeTokenAmount, BridgeTokenObject } from 'utils/bridge/entities/BridgeToken'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { BridgeToken } from './entities/BridgeToken'
import { getOverriddenMediator, isOverridden } from './overrides'

export const getWalletProviderName = (provider: Web3Provider) => provider?.connection?.url || null

export const getNativeCurrency = (chainId: number): BridgeTokenObject => nativeCurrencies[chainId || 1]

export const getNetworkName = (chainId: number) => networkNames[chainId] || 'Unknown Network'

export const getNetworkLabel = (chainId: number) => networkLabels[chainId] || 'Unknown'

export const getNetworkCurrency = (chainId: number) =>
  networkCurrencies[chainId] || { name: 'Unknown', symbol: 'Unknown' }

export const getRPCUrl = (chainId: number, returnAsArray = false) =>
  returnAsArray ? chainUrls[chainId || 1].rpc : chainUrls[chainId || 1].rpc[0]

export const getExplorerUrl = (chainId: number) => (chainUrls[chainId] || chainUrls[1]).explorer

export const getTokenListUrl = (chainId: number) => defaultTokensUrl[chainId] || defaultTokensUrl[1]

export const removeElement = (array: any[], index: number) => {
  const cloneArr = [...array]
  cloneArr.splice(index, 1)
  return cloneArr
}

export const uniqueTokens = (list: BridgeToken[]) => {
  const seen = {}
  return list.filter((token) => {
    const { address } = token
    const lowerCaseAddress = address.toLowerCase()
    const isDuplicate = Object.prototype.hasOwnProperty.call(seen, lowerCaseAddress)
      ? false
      : (seen[lowerCaseAddress] = true)
    return isDuplicate
  })
}

export const formatValue = (num: BigNumber, dec: number) => {
  const str = utils.formatUnits(num, dec)
  if (str.length > 50) {
    const expStr = Number(str).toExponential().replace(/e\+?/, ' x 10^')
    const split = expStr.split(' x 10^')
    const first = Number(split[0]).toLocaleString('en', {
      maximumFractionDigits: 4,
    })
    return `${first} x 10^${split[1]}`
  }
  return Number(str).toLocaleString('en', { maximumFractionDigits: 4 })
}

export const formatBridgeTokenAmount = (token: BridgeToken, amount: BigNumber) => {
  const tokenAmount: unknown = amount
  if (!token) {
    return '0'
  }
  const amounted = new BridgeTokenAmount(token, tokenAmount as BigintIsh)
  return toSignificantCurrency(amounted)
}

export const parseValue = (num: number | string, dec: number) => {
  if (!num || isNaN(Number(num))) {
    return BigNumber.from(0)
  }
  return utils.parseUnits(`${num}`, dec)
}

export const uriToHttp = (uri: string) => {
  const protocol = uri.split(':')[0].toLowerCase()
  const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2]
  const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2]
  switch (protocol) {
    case 'https':
      return [uri]
    case 'http':
      return [`https${uri.substr(4)}`, uri]
    case 'ipfs':
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`]
    case 'ipns':
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`]
    default:
      return []
  }
}

export const fetchQueryParams = (search: string) => {
  if (!search || !search.trim().length) return null
  return search
    .replace('?', '')
    .split(/&/g)
    .reduce((acc, keyValuePair) => {
      const [key, value] = keyValuePair.split('=')
      acc[key] = value
      return acc
    }, {})
}

export const getAccountString = (address: string) => {
  const account = getAddress(address)
  const len = account.length
  return `0x${account.substr(2, 4)}...${account.substr(len - 4, len - 1)}`
}

export const logError = (error) => {
  // eslint-disable-next-line no-console
  // debugger
  console.error(error)
}

export const logDebug = (error) => {
  // if (process.env.REACT_APP_DEBUG_LOGS === 'true') {
  //   // eslint-disable-next-line no-console
  //   console.debug(error)
  // }
}

const {
  XDAI_RPC_URL,
  MAINNET_RPC_URL,
  BSC_RPC_URL,
  BSC_TESTNET_RPC_URL,
  POLYGON_TESTNET_RPC_URL,
  ROPSTEN_TESTNET_RPC_URL,
  RINKEBY_TESTNET_RPC_URL,
  KOVAN_RPC_URL,
  SOKOL_RPC_URL,
  HECO_RPC_URL,
  POLYGON_RPC_URL,
} = LOCAL_STORAGE_KEYS

export const getRPCKeys = (bridgeDirection) => {
  switch (bridgeDirection) {
    case ETH_XDAI_BRIDGE:
      return {
        homeRPCKey: XDAI_RPC_URL,
        foreignRPCKey: MAINNET_RPC_URL,
      }
    case BSC_XDAI_BRIDGE:
      return {
        homeRPCKey: XDAI_RPC_URL,
        foreignRPCKey: BSC_RPC_URL,
      }
    case BSC_HECO_BRIDGE:
      return {
        homeRPCKey: BSC_TESTNET_RPC_URL,
        foreignRPCKey: HECO_RPC_URL,
      }
    case BSC_POLYGON_TEST_BRIDGE:
      return {
        homeRPCKey: BSC_TESTNET_RPC_URL,
        foreignRPCKey: POLYGON_TESTNET_RPC_URL,
      }
    case BSC_POLYGON_BRIDGE:
      return {
        homeRPCKey: BSC_RPC_URL,
        foreignRPCKey: POLYGON_RPC_URL,
      }
    case ETH_BSC_BRIDGE:
      return {
        homeRPCKey: BSC_RPC_URL,
        foreignRPCKey: MAINNET_RPC_URL,
      }
    case BSC_ROPSTEN_BRIDGE:
      return {
        homeRPCKey: BSC_TESTNET_RPC_URL,
        foreignRPCKey: ROPSTEN_TESTNET_RPC_URL,
      }
    case BSC_RINKEBY_BRIDGE:
      return {
        homeRPCKey: BSC_TESTNET_RPC_URL,
        foreignRPCKey: RINKEBY_TESTNET_RPC_URL,
      }
    case KOVAN_SOKOL_BRIDGE:
    default:
      return {
        homeRPCKey: SOKOL_RPC_URL,
        foreignRPCKey: KOVAN_RPC_URL,
      }
  }
}

export const getHelperContract = (chainId: number): string => nativeCurrencyMediators[chainId || 1]

export const getMediatorAddressWithoutOverride = (bridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE, chainId: number) => {
  if (!bridgeDirection || !chainId) return null
  const { homeChainId, homeMediatorAddress, foreignMediatorAddress } = networks[bridgeDirection]
  return homeChainId === chainId ? homeMediatorAddress.toLowerCase() : foreignMediatorAddress.toLowerCase()
}

export const getMediatorAddress = (bridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE, token: BridgeToken) => {
  console.log(bridgeDirection)
  console.log(token)
  if (!token || !token.chainId || !token.address) return null
  if (isOverridden(bridgeDirection, token)) {
    return getOverriddenMediator(bridgeDirection, token)
  }
  return getMediatorAddressWithoutOverride(bridgeDirection, token.chainId)
}

export const truncateText = (text: string, maxLength: number) => {
  let truncated = text

  if (truncated.length > maxLength - 3) {
    truncated = `${truncated.substr(0, maxLength - 3)}...`
  }
  return truncated
}

export const getDefaultToken = (bridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE, chainId: number): BridgeToken => {
  const defaultToken = defaultTokens?.[bridgeDirection]?.[chainId] || null
  const tokenRaw =
    defaultToken &&
    new BridgeToken({
      decimals: 18,
      mediator: '',
      mode: '',
      ...defaultToken,
    })
  return tokenRaw
}

const IMPOSSIBLE_ERROR = 'Unable to perform the operation. Reload the application and try again.'

const TRANSACTION_REPLACED_ERROR =
  'Transaction was replaced by another. Reload the application and find the transaction in the history page.'

export const handleWalletError = (error, showError) => {
  if (error?.message && error?.message.length <= 120) {
    showError(error.message)
  } else if (error?.message && error?.message.toLowerCase().includes('transaction was replaced')) {
    showError(TRANSACTION_REPLACED_ERROR)
  } else {
    showError(IMPOSSIBLE_ERROR)
  }
}
