import React from 'react'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  max-width: 1664px;
  margin: 0 auto;
`

const BodyWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  z-index: 1;
  min-height: 100vh;
  padding: 32px 33px 210px 29px;

  @media ${mq.down(breakpoints.lg)} {
    padding: 24px 24px 210px 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    padding: 16px 10px 210px 10px;
  }
`

const FarmContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <AppWrapper>
      <BodyWrapper className={className}>{children}</BodyWrapper>
    </AppWrapper>
  )
}

export default FarmContainer
