import { useRouter } from 'next/router'
import { ROUTES } from 'routes'

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export const RedirectOldRemoveLiquidityPathStructure = () => {
  const router = useRouter()
  const tokens = router.query?.tokens as string
  if (!OLD_PATH_STRUCTURE.test(tokens)) {
    router.push('/pool')
    return null
  }
  const [currency0, currency1] = tokens.split('-')
  router.push(ROUTES.removeByMultiple(currency0, currency1))
  return null
}
