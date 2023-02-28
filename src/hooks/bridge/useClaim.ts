import { useCallback } from 'react'
import { executeSignatures, TOKENS_CLAIMED } from 'utils/bridge/amb'
import { getNetworkName } from 'utils/bridge/helpers'
import { getMessage, messageCallStatus } from 'utils/bridge/message'
import { getEthersProvider } from 'utils/bridge/providers'
import { useBridgeDirection } from './useBridgeDirection'
import { useWeb3Context } from './useWeb3Context'

export class WrongNetworkError extends Error {}

export function useClaim() {
  const { homeChainId, homeAmbAddress, foreignChainId, foreignAmbAddress, foreignAmbVersion, homeRequiredSignatures } =
    useBridgeDirection()
  const { providerChainId, ethersProvider } = useWeb3Context()

  return useCallback(
    async (txHash: string, txMessage?: any) => {
      if (providerChainId !== foreignChainId) {
        throw new WrongNetworkError(`Wrong network. Please connect your wallet to ${getNetworkName(foreignChainId)}.`)
      }

      let message = txMessage?.signatures && txMessage.signatures.length >= homeRequiredSignatures ? txMessage : null
      if (!message) {
        const homeProvider = await getEthersProvider(homeChainId)
        message = await getMessage(true, homeProvider, homeAmbAddress, txHash)
      }
      const claimed = await messageCallStatus(foreignAmbAddress, ethersProvider, message.messageId)
      if (claimed) {
        throw Error(TOKENS_CLAIMED)
      }
      return executeSignatures(ethersProvider, foreignAmbAddress, foreignAmbVersion, message)
    },
    [
      providerChainId,
      foreignChainId,
      homeRequiredSignatures,
      foreignAmbAddress,
      ethersProvider,
      foreignAmbVersion,
      homeChainId,
      homeAmbAddress,
    ],
  )
}
