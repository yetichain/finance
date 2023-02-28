import { BridgeInfoItemType, ENABLED_BRIDGES_ENUMS_TYPE, networks } from 'constants/bridge/bridge.networks'
import { useCallback, useMemo } from 'react'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import { useAmbVersion } from './useAmbVersion'
import { useRequiredSignatures } from './useRequiredSignatures'

export const useBridgeDirection = () => {
  const { networkFrom, networkTo } = useBridgeNetworks()

  const findNetworkBridge = useCallback(() => {
    const mainBridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE = `${networkFrom?.direction}-${networkTo?.direction}` as any
    const revertedBridgeDirection: ENABLED_BRIDGES_ENUMS_TYPE =
      `${networkTo?.direction}-${networkFrom?.direction}` as any

    if (!networks[mainBridgeDirection]) {
      return { bridgeDirection: revertedBridgeDirection, reverted: true }
    }
    return { bridgeDirection: mainBridgeDirection, reverted: false }
  }, [networkFrom?.direction, networkTo?.direction])

  const { bridgeDirection, reverted } = findNetworkBridge()

  const bridgeConfig: BridgeInfoItemType = useMemo(
    () => networks[bridgeDirection] || Object.values(networks)[0],
    [bridgeDirection],
  )

  const {
    homeChainId,
    foreignChainId,
    ambLiveMonitorPrefix,
    homeGraphName,
    foreignGraphName,
    homeAmbAddress,
    foreignAmbAddress,
  } = bridgeConfig

  const foreignAmbVersion = useAmbVersion(foreignChainId, foreignAmbAddress)

  const homeRequiredSignatures = useRequiredSignatures(homeChainId, homeAmbAddress)

  const getBridgeChainId = useCallback(
    (chainId: number) => (chainId === homeChainId ? foreignChainId : homeChainId),
    [homeChainId, foreignChainId],
  )

  const getMonitorUrl = useCallback(
    (chainId: number, hash: string) => `${ambLiveMonitorPrefix}/${chainId}/${hash}`,
    [ambLiveMonitorPrefix],
  )

  const getGraphEndpoint = useCallback(
    (chainId: number) => {
      const subgraphName = homeChainId === chainId ? homeGraphName : foreignGraphName
      return `https://api.thegraph.com/subgraphs/name/${subgraphName}`
    },
    [foreignGraphName, homeChainId, homeGraphName],
  )

  const getAMBAddress = useCallback(
    (chainId: number) => (chainId === homeChainId ? homeAmbAddress : foreignAmbAddress),
    [homeChainId, homeAmbAddress, foreignAmbAddress],
  )

  return {
    bridgeDirection,
    getBridgeChainId,
    getMonitorUrl,
    getGraphEndpoint,
    getAMBAddress,
    foreignAmbVersion,
    homeRequiredSignatures,
    reverted,
    ...bridgeConfig,
  }
}
