import { useEffect, useState } from 'react'
import { useStoreAccount } from 'store/account/useStoreAccount'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { useStoreBridge } from './bridge/useStoreBridge'

export const InitStores = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  const initStoreAccount = useStoreAccount((state) => state.initStoreAccount)
  const killStoreAccount = useStoreAccount((state) => state.killStoreAccount)
  const killStoreNetwork = useStoreNetwork((state) => state.killStoreNetwork)
  const initStoreBridge = useStoreBridge((state) => state.initStoreBridge)
  const killStoreBridge = useStoreBridge((state) => state.killStoreBridge)

  if (!isInitialized) {
    initStoreAccount()
    initStoreBridge()
    setIsInitialized(true)
  }

  useEffect(() => {
    return () => {
      killStoreAccount()
      killStoreNetwork()
      killStoreBridge()
    }
  }, [killStoreAccount, killStoreNetwork, killStoreBridge])

  return null
}
