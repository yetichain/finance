import { Token } from '@alium-official/sdk'
import { usePair } from 'data/Reserves'
import { usePairUpdater } from 'hooks/liqudity/usePairUpdater'
import { useMemo } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { MigratePair } from './../lib/migrate.types'

/**
 * Pair creator and saver for Migrate tokens.
 * Auto search pairs if exist, checkout in localstorage.
 * Save if finded in pool and not saved in localstorage.
 */
export const useCreateMigratePair = (currentPair: MigratePair) => {
  const chainId = useStoreNetwork((state) => state.currentChainId)

  // Creator
  const currencyA = useMemo(
    () => currentPair && new Token(chainId, currentPair.addressA, 18, currentPair.symbolA, currentPair.title),
    [chainId, currentPair],
  )
  const currencyB = useMemo(
    () => currentPair && new Token(chainId, currentPair.addressB, 18, currentPair.symbolB, currentPair.title),
    [chainId, currentPair],
  )
  const [, pair] = usePair(currencyA, currencyB)

  // Finder
  const findPair = useMemo(() => pair, [pair])

  // Validate and save
  // pair can find only after adding(if not added before), use this finder for save and add
  usePairUpdater(currentPair, findPair)
}
