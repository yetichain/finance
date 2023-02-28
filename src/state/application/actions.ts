import { createAction } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: TokenList
        newList: TokenList
        auto: boolean
      }
    }

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('app/updateBlockNumber')
export const toggleWalletModal = createAction('app/toggleWalletModal')
export const toggleSettingsMenu = createAction('app/toggleSettingsMenu')
export const addPopup =
  createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>('app/addPopup')
export const removePopup = createAction<{ key: string }>('app/removePopup')
export const setConnectionError = createAction<{ error: any }>('auth/setConnectionError')
