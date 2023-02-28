import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { isDev } from 'config'
import { load, save } from 'redux-localstorage-simple'
import { getThemeCache } from 'utils/theme'
import achievements from './achievements'
import application from './application/reducer'
import burn from './burn/reducer'
import { updateVersion } from './global/actions'
import lists from './lists/reducer'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import pools from './pools'
import profile from './profile'
import swap from './swap/reducer'
import teams from './teams'
import toasts from './toasts'
import transactions from './transactions/reducer'
import user from './user/reducer'

interface MergedState {
  user: any
  transactions: {
    [key: string]: any
  }
}
const PERSISTED_KEYS: string[] = ['user', 'transactions']
const loadedState = load({ states: PERSISTED_KEYS }) as MergedState
if (loadedState.user) {
  loadedState.user.userDarkMode = getThemeCache()
}

const store = configureStore({
  devTools: isDev,
  reducer: {
    toasts,
    pools,
    profile,
    teams,
    achievements,
    application,
    user,
    transactions,
    multicall,
    swap,
    mint,
    burn,
    lists,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],

  preloadedState: {
    ...loadedState,
  },
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
