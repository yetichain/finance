// const supportedChainIds = [1, 3, 56, 97, 128, 137, 256, 80001]
import { isDev, isProduction } from 'config'

const supportedChainIdsProd = [1, 56, 128, 137]
const supportedChainIdsDev = [4, 97, 256, 80001]
const defaultChainId = isProduction ? 56 : 97
const chainIdProdToDev = {
  1: 4,
  56: 97,
  128: 256,
  137: 80001,
}
const chainIdDevToProd = {
  4: 1,
  97: 56,
  256: 128,
  80001: 137,
}

export const getActualChainId = (chainId?: number): number => {
  if (supportedChainIdsProd.includes(chainId)) {
    if (isProduction) {
      return chainId
    }
    return chainIdProdToDev?.[chainId] ?? defaultChainId
  }
  if (supportedChainIdsDev.includes(chainId)) {
    if (isDev) {
      return chainId
    }
    return chainIdDevToProd?.[chainId] ?? defaultChainId
  }
  return defaultChainId
}
