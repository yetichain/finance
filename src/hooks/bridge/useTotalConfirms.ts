import { useEffect, useState } from 'react'
import { fetchConfirmations } from 'utils/bridge/amb'
import { logError } from 'utils/bridge/helpers'
import { useBridgeDirection } from './useBridgeDirection'
import { useWeb3Context } from './useWeb3Context'

export const useTotalConfirms = () => {
  const { homeChainId, homeAmbAddress, foreignAmbAddress, reverted } = useBridgeDirection()
  const { providerChainId, ethersProvider, connected } = useWeb3Context()
  const [totalConfirms, setTotalConfirms] = useState(0)
  const [failed, setfailed] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (!connected) return

    if (providerChainId && ethersProvider && !totalConfirms && !failed && !loading) {
      setloading(true)
      const ambAddress = !reverted ? homeAmbAddress : foreignAmbAddress
      fetchConfirmations(ambAddress, ethersProvider)
        .then((total) => setTotalConfirms(total))
        .catch((confirmsError) => {
          setfailed(true)
          logError({ confirmsError })
        })
        .finally(() => {
          setloading(false)
        })
    }
  }, [
    ethersProvider,
    failed,
    foreignAmbAddress,
    homeAmbAddress,
    homeChainId,
    providerChainId,
    reverted,
    totalConfirms,
    connected,
  ])

  return totalConfirms
}
