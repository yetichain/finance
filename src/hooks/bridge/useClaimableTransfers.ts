import { useBridgeContext } from 'contexts/BridgeContext'
import { useEffect, useState } from 'react'
import { combineRequestsWithExecutions, getExecutions, getRequests, TransferItem } from 'utils/bridge/history'
import { useBridgeDirection } from './useBridgeDirection'
import { useWeb3Context } from './useWeb3Context'

export const useClaimableTransfers = () => {
  const { homeChainId, foreignChainId, getGraphEndpoint } = useBridgeDirection()
  const { account } = useWeb3Context()
  const { txHash } = useBridgeContext()
  const [transfers, setTransfers] = useState<TransferItem[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!account) return () => undefined
    let isSubscribed = true
    async function update() {
      setLoading(true)
      setTransfers(null)
      const { requests } = await getRequests(account, getGraphEndpoint(homeChainId))
      const { executions } = await getExecutions(getGraphEndpoint(foreignChainId), requests)
      const xDaiTransfers = combineRequestsWithExecutions(requests, executions, homeChainId, foreignChainId)
        .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
        .filter((t) => !t.receivingTx)
      if (isSubscribed) {
        setTransfers(xDaiTransfers)
        setLoading(false)
      }
    }
    update()
    return () => {
      isSubscribed = false
    }
  }, [])

  return { transfers, loading }
}
