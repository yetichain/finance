import { useActiveWeb3React } from 'hooks'
import { useEffect, useState } from 'react'
import { combineRequestsWithExecutions, getExecutions, getRequests, TransferItem } from 'utils/bridge/history'
import { useBridgeDirection } from './useBridgeDirection'

export const useUserHistory = () => {
  const { homeChainId, foreignChainId, getGraphEndpoint } = useBridgeDirection()
  const { account } = useActiveWeb3React()
  const [transfers, setTransfers] = useState<TransferItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!account) return
    let isSubscribed = true
    async function update() {
      setTransfers([])
      setLoading(true)
      const [{ requests: homeRequests }, { requests: foreignRequests }] = await Promise.all([
        getRequests(account, getGraphEndpoint(homeChainId)),
        getRequests(account, getGraphEndpoint(foreignChainId)),
      ])
      const [{ executions: homeExecutions }, { executions: foreignExecutions }] = await Promise.all([
        getExecutions(getGraphEndpoint(homeChainId), foreignRequests),
        getExecutions(getGraphEndpoint(foreignChainId), homeRequests),
      ])
      const homeTransfers = combineRequestsWithExecutions(homeRequests, foreignExecutions, homeChainId, foreignChainId)
      const foreignTransfers = combineRequestsWithExecutions(
        foreignRequests,
        homeExecutions,
        foreignChainId,
        homeChainId,
      )
      const allTransfers = [...homeTransfers, ...foreignTransfers].sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp),
      )
      if (isSubscribed) {
        setTransfers(allTransfers)
        setLoading(false)
      }
    }

    update()

    return () => {
      isSubscribed = false
    }
  }, [account, foreignChainId, getGraphEndpoint, homeChainId])

  return { transfers, loading }
}
