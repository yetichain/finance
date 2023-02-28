import { BridgeNetworks } from './types'
import { storeBridge, StoreBridgeState } from './useStoreBridge'

const BRIDGE_STORAGE_NAME = 'bridge'
const BRIDGE_STORAGE_VER = 'ver.0'
const BRIDGE_STORAGE_VER_PREV = 'ver.0'
const BRIDGE_STORAGE = BRIDGE_STORAGE_NAME + BRIDGE_STORAGE_VER

export const bridgeStorage = () => ({
  save: () => {
    try {
      const { fromNetwork, toNetwork } = storeBridge.getState()
      const state = JSON.stringify({ fromNetwork, toNetwork })

      localStorage.setItem(BRIDGE_STORAGE, state)
    } catch (error) {
      // console.error('cannot be save in bridge storage')
    }
  },
  set: (key: BridgeNetworks, value: number) => {
    try {
      const prev = bridgeStorage().get()
      if (prev) {
        localStorage.setItem(
          BRIDGE_STORAGE,
          JSON.stringify({
            ...prev,
            [key]: value,
          }),
        )
      } else {
        localStorage.setItem(
          BRIDGE_STORAGE,
          JSON.stringify({
            [key]: value,
          }),
        )
      }
    } catch (error) {
      console.error(key, 'cannot be set in bridge storage')
    }
  },
  get: (): Pick<StoreBridgeState, BridgeNetworks> => {
    try {
      return JSON.parse(localStorage.getItem(BRIDGE_STORAGE)) as any
    } catch (error) {
      return null
    }
  },
  clear: () => {
    localStorage.removeItem(BRIDGE_STORAGE)
  },
  migrate: () => {
    if (BRIDGE_STORAGE_VER !== BRIDGE_STORAGE_VER_PREV) {
      localStorage.removeItem(BRIDGE_STORAGE + BRIDGE_STORAGE_VER_PREV)
    }
  },
})
