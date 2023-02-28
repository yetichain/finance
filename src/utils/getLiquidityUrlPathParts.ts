// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
// In the URL, using the quote token 'BNB' is represented by 'ETH'
import { storeNetwork } from 'store/network/useStoreNetwork'

const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses }) => {
  const { currentChainId } = storeNetwork.getState()

  const firstPart = quoteTokenSymbol === 'BNB' ? 'ETH' : quoteTokenAdresses[currentChainId]
  const secondPart = tokenAddresses[currentChainId]
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
