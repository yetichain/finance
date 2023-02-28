import Loader from 'components/Loaders/Loader'
import { ShadowComponent } from 'components/Main/ShadowComponent'
import React, { FC } from 'react'
import styled from 'styled-components'

const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 35px;
    width: 35px;
  }
`
interface LoadProps {
  loading: boolean
  children: React.ReactNode
}
const FarmLoader: FC<LoadProps> = ({ loading, children }) => {
  return (
    <>
      {loading && (
        <LoadWrapper>
          <Loader />
        </LoadWrapper>
      )}
      <ShadowComponent hide={loading}>
        <>{children}</>
      </ShadowComponent>
    </>
  )
}

export default FarmLoader
