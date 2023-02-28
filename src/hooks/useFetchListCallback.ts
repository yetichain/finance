import { ChainId } from '@alium-official/sdk'
import { nanoid } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'
import { getNetworkLibrary } from 'connectors'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchTokenList } from 'state/lists/actions'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import getTokenList from 'utils/getTokenList'
import resolveENSContentHash from 'utils/resolveENSContentHash'
import { useActiveWeb3React } from './index'

export function useFetchListCallback(): (listUrl: string) => Promise<TokenList> {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const { chainId, library } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  const ensResolver = useCallback(
    (ensName: string) => {
      if (!library || chainId !== ChainId.MAINNET) {
        if (currentChainId === ChainId.MAINNET) {
          const networkLibrary = getNetworkLibrary()
          if (networkLibrary) {
            return resolveENSContentHash(ensName, networkLibrary)
          }
        }
        throw new Error('Could not construct mainnet ENS resolver')
      }
      return resolveENSContentHash(ensName, library)
    },
    [chainId, currentChainId, library],
  )

  return useCallback(
    async (listUrl: string) => {
      const requestId = nanoid()
      dispatch(fetchTokenList.pending({ requestId, url: listUrl }))
      return getTokenList(chainId as ChainId, listUrl, ensResolver)
        .then((tokenList) => {
          dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }))
          return tokenList
        })
        .catch((error) => {
          console.error(`Failed to get list at url ${listUrl}`, error)
          dispatch(fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }))
          throw error
        })
    },
    [chainId, dispatch, ensResolver],
  )
}

export default useFetchListCallback
