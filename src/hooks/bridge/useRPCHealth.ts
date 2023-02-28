import { useEffect, useState } from 'react'
import { logDebug, logError } from 'utils/bridge/helpers'
import { getEthersProvider } from 'utils/bridge/providers'
import { useBridgeDirection } from './useBridgeDirection'

const DEFAULT_RPC_HEALTH_UPDATE_INTERVAL = 60000

const UPDATE_INTERVAL = DEFAULT_RPC_HEALTH_UPDATE_INTERVAL

export const useRPCHealth = () => {
  const { homeChainId, foreignChainId } = useBridgeDirection()

  const [{ homeHealthy, foreignHealthy }, setHealthStatus] = useState({
    homeHealthy: true,
    foreignHealthy: true,
  })

  useEffect(() => {
    const subscriptions = []
    const unsubscribe = () => {
      subscriptions.forEach((s) => {
        clearTimeout(s)
      })
    }

    let isSubscribed = true

    const load = async () => {
      try {
        const homeProvider = await getEthersProvider(homeChainId)
        const homeHealth = homeProvider !== null
        const foreignProvider = await getEthersProvider(foreignChainId)
        const foreignHealth = foreignProvider !== null

        if (isSubscribed) {
          setHealthStatus({
            homeHealthy: homeHealth,
            foreignHealthy: foreignHealth,
          })
        }
        logDebug({
          homeHealth,
          foreignHealth,
          message: 'updated rpc health data',
        })

        const timeoutId = setTimeout(() => load(), UPDATE_INTERVAL)
        subscriptions.push(timeoutId)
      } catch (graphHealthError) {
        logError({ graphHealthError })
      }
    }

    // unsubscribe from previous polls
    unsubscribe()

    load()
    // unsubscribe when unmount component
    return () => {
      isSubscribed = false
      unsubscribe()
    }
  }, [])

  return { homeHealthy, foreignHealthy }
}
