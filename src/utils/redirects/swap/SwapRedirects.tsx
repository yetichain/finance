import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ROUTES } from 'routes'
import { AppState } from 'state'
import { useDefaultsFromURLSearch } from 'state/swap/hooks'
import AddLiquidity from 'views/AddLiquidity'
import Swap from 'views/Swap'

interface SwapProps {
  type: 'exchange' | 'add'
}

export const RedirectToAddLiquidity = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(ROUTES.add)
  }, [router])
  return <div />
}

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40})-(0x[a-fA-F0-9]{40})$/

export const RedirectOldAddLiquidityPathStructure: FC<SwapProps> = ({ type }) => {
  const isAdd = type === 'add'
  const router = useRouter()
  const { query } = router
  const currencyIdA = query?.currencyIdA as string
  const match = currencyIdA.match(OLD_PATH_STRUCTURE)
  if (match?.length) {
    isAdd
      ? router.push(ROUTES.addByMultiple(match[1], match[2]))
      : router.push(ROUTES.exchangeByMultiple(match[1], match[2]))
    return null
  }
  if (isAdd) {
    return <AddLiquidity currencyIdA={currencyIdA} />
  } else {
    return <Swap />
  }
}

export const RedirectDuplicateTokenIds: FC<SwapProps> = ({ type }) => {
  const isAdd = type === 'add'
  const router = useRouter()
  const { query } = router
  const currencyIdA = query?.currencyIdA as string
  const currencyIdB = query?.currencyIdB as string
  if (currencyIdA?.toLowerCase() === currencyIdB?.toLowerCase()) {
    isAdd ? router.push(ROUTES.addByOne(currencyIdA)) : router.push(ROUTES.exchangeByOne(currencyIdA))
    return null
  }
  if (isAdd) {
    return <AddLiquidity currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
  } else {
    return <Swap />
  }
}

// Redirects to swap but only replace the pathname
export const RedirectPathToSwapOnly = () => {
  const location = useRouter()
  useEffect(() => {
    location.push('/swap')
  }, [location])
  return <div />
}

// When inputs change redirect swap/{currency}/{currency}
// Worked with useDefaultsFromURLSearch (use for set currency)
export const useExchangeRedirect = () => {
  const { pathname, query, push } = useRouter()

  const currencyIdA = query?.currencyIdA as string
  const currencyIdB = query?.currencyIdB as string

  const input = useSelector((state: AppState) => state.swap.INPUT)
  const output = useSelector((state: AppState) => state.swap.OUTPUT)
  const inputs = React.useMemo(
    () => ({
      INPUT: input,
      OUTPUT: output,
    }),
    [input, output],
  )

  React.useEffect(() => {
    const isBaseUrl = ROUTES.exchange === pathname
    const inputExist = inputs?.INPUT?.currencyId
    const outputExist = inputs?.OUTPUT?.currencyId

    const inputsIdsExist = Boolean(inputExist && outputExist)

    const currencyFromUrlNotEqualCurrent =
      Boolean(inputExist && inputExist !== currencyIdA) || Boolean(outputExist && outputExist !== currencyIdB)

    if (isBaseUrl && inputsIdsExist) {
      push(ROUTES.exchangeByMultiple(inputs.INPUT.currencyId, inputs.OUTPUT.currencyId))
    }
    if (inputsIdsExist && currencyFromUrlNotEqualCurrent) {
      push(ROUTES.exchangeByMultiple(inputs.INPUT.currencyId, inputs.OUTPUT.currencyId))
    }
  }, [inputs])
}

// Combined
export const useExchangeInputsRedirect = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()
  useExchangeRedirect()
  return loadedUrlParams
}
