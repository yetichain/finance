import { Pair } from '@alium-official/sdk'
import React, { useMemo } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`
interface PairLoaderProps {
  children: React.ReactNode
  pair: Pair
}

function areEqual(prevProps: PairLoaderProps, nextProps: PairLoaderProps) {
  if (prevProps.children !== nextProps.children) {
    return false
  }
  if (prevProps?.pair?.liquidityToken?.address !== nextProps?.pair?.liquidityToken?.address) {
    return false
  }
  if (!prevProps?.pair || !nextProps?.pair) {
    return false
  }
  return true
}

export default React.memo(({ children, pair }: PairLoaderProps) => {
  const pairNotFind = useMemo(() => !pair, [pair])
  console.info('REMOVE LIQUDITY PAIR:', pair)

  if (pairNotFind) {
    return (
      <LoaderWrapper>
        <StyledLoader type='TailSpin' color='#6C5DD3' />
      </LoaderWrapper>
    )
  } else {
    return <>{children} </>
  }
}, areEqual)
