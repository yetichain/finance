import { networkFinder, useStoreBridge } from 'store/bridge/useStoreBridge'
/**
 * Hook return current networks and native currencies
 */
export const useBridgeNetworks = () => {
  const from = useStoreBridge((state) => state.fromNetwork)
  const to = useStoreBridge((state) => state.toNetwork)
  const networkFrom = networkFinder(from)
  const networkTo = networkFinder(to)
  const availableNetworksBridge = [networkFrom?.chainId, networkTo?.chainId]

  return { networkFrom, networkTo, availableNetworksBridge }
}
