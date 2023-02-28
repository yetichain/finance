import router from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from 'routes'
import { useStoreNetwork } from 'store/network/useStoreNetwork'

// For update multicall when chainid changed on swap routes
export const useReloadSwap = (logout: () => void) => {
  useEffect(() => {
    useStoreNetwork.subscribe(
      (currentChainId, prevChainId) => {
        const isSwapRoutes = router.pathname.includes(ROUTES.add) || router.pathname.includes(ROUTES.exchange)
        if (isSwapRoutes) {
          logout()
          // setTimeout(() => {
          //   window.location.reload()
          // }, 150)
        }
      },
      (state) => state.currentChainId,
    )
  }, [])
}
