import { useActiveWeb3React } from 'hooks'
import useToast from 'hooks/useToast'
import { useEffect, useRef, useState } from 'react'
import { getHealthStatus } from 'utils/bridge/graphHealth'
import { logDebug, logError } from 'utils/bridge/helpers'
import { getEthersProvider } from 'utils/bridge/providers'
import { REACT_APP_GRAPH_HEALTH_THRESHOLD_BLOCKS } from '../../constants/bridge/bridge.env'
import { useBridgeDirection } from './useBridgeDirection'

const DEFAULT_GRAPH_HEALTH_UPDATE_INTERVAL = 60000

const DEFAULT_GRAPH_HEALTH_THRESHOLD_BLOCKS = 10

const UPDATE_INTERVAL = DEFAULT_GRAPH_HEALTH_UPDATE_INTERVAL

const THRESHOLD_BLOCKS = REACT_APP_GRAPH_HEALTH_THRESHOLD_BLOCKS || DEFAULT_GRAPH_HEALTH_THRESHOLD_BLOCKS

export const useGraphHealth = (description, options = { onlyHome: false, disableAlerts: false }) => {
  const { onlyHome, disableAlerts } = options
  const { bridgeDirection, homeChainId, foreignChainId } = useBridgeDirection()
  const { chainId: providerChainId } = useActiveWeb3React()

  const isHome = providerChainId === homeChainId

  const [homeHealthy, setHomeHealthy] = useState(true)

  const [foreignHealthy, setForeignHealthy] = useState(true)

  const [loading, setLoading] = useState(false)

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
        setLoading(true)
        const homeProvider = await getEthersProvider(homeChainId)
        const foreignProvider = await getEthersProvider(foreignChainId)
        if (!homeProvider || !foreignProvider) return
        const [{ homeHealth, foreignHealth }, homeBlockNumber, foreignBlockNumber] = await Promise.all([
          getHealthStatus(bridgeDirection),
          homeProvider?.getBlockNumber(),
          foreignProvider?.getBlockNumber(),
        ])
        logDebug({
          homeHealth,
          foreignHealth,
          homeBlockNumber,
          foreignBlockNumber,
          message: 'updated graph health data',
        })

        const isHomeHealthy =
          homeHealth?.isReachable &&
          !homeHealth.isFailed &&
          homeHealth.isSynced &&
          Math.abs(homeHealth.latestBlockNumber - homeBlockNumber) < THRESHOLD_BLOCKS &&
          Math.abs(homeHealth.chainHeadBlockNumber - homeBlockNumber) < THRESHOLD_BLOCKS

        const isForeignHealthy =
          foreignHealth?.isReachable &&
          !foreignHealth.isFailed &&
          foreignHealth.isSynced &&
          Math.abs(foreignHealth.latestBlockNumber - foreignBlockNumber) < THRESHOLD_BLOCKS &&
          Math.abs(foreignHealth.chainHeadBlockNumber - foreignBlockNumber) < THRESHOLD_BLOCKS

        if (isSubscribed) {
          setHomeHealthy(isHomeHealthy)
          setForeignHealthy(isForeignHealthy)
        }

        const timeoutId = setTimeout(() => load(), UPDATE_INTERVAL)
        subscriptions.push(timeoutId)
      } catch (graphHealthError) {
        logError({ graphHealthError })
      } finally {
        setLoading(false)
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

  const { toastError: toast } = useToast()
  const toastIdRef = useRef()

  useEffect(() => {
    if (!loading) {
      if (toastIdRef.current) {
        // toast.close(toastIdRef.current)
      }
      if (!(homeHealthy && foreignHealthy)) {
        if ((onlyHome === true && !isHome) || disableAlerts === true) return
        toast('Subgraph Error')
      }
    }
  }, [])

  return { homeHealthy, foreignHealthy }
}
