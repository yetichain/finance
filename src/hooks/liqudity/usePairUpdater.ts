import { Pair } from '@alium-official/sdk'
import { USER_LOCALSTORAGE_KEY } from 'constants/localstorage'
import { useCallback, useEffect } from 'react'
import { AppState } from 'state'
import { SerializedPair } from 'state/user/actions'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { useFindLiqudityAfterAdd } from './useFindLiqudityAfterAdd'

interface PairTokenAddresses {
  addressA: string
  addressB: string
}
/**
 * Auto search pairs if exist, checkout in localstorage.
 * Save if finded in pool and not saved in localstorage.
 */
export const usePairUpdater = (pairTokens: PairTokenAddresses, findPair: Pair) => {
  const findPairAfterAdd = useFindLiqudityAfterAdd(findPair)
  const chainId = useStoreNetwork((state) => state.currentChainId)

  const savePair = useCallback(() => {
    const userLocalstorage = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    const state: AppState['user'] = JSON.parse(userLocalstorage)
    if (state?.pairs && pairTokens && findPair) {
      const pairs = state.pairs[chainId] ? Object.values(state.pairs[chainId]) : []
      const pairIsSaved =
        pairs?.length && pairs.find((pair) => finderEqualsTokenPair(pair, pairTokens?.addressA, pairTokens?.addressB))

      if (!pairIsSaved) {
        findPairAfterAdd()
      }
    }
  }, [chainId, pairTokens, findPairAfterAdd, findPair])

  useEffect(() => {
    savePair()
  }, [pairTokens, findPair, savePair])
}

// Helpers

const finderEqualsTokenPair = (pair: SerializedPair, addressA: string, addressB: string) => {
  return Boolean(
    (pair?.token0?.address?.toLowerCase() === addressA?.toLowerCase() &&
      pair?.token1?.address?.toLowerCase() === addressB?.toLowerCase()) ||
      (pair?.token0?.address?.toLowerCase() === addressB?.toLowerCase() &&
        pair?.token1?.address?.toLowerCase() === addressA?.toLowerCase()),
  )
}
