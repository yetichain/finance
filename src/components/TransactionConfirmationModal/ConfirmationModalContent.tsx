import { ReactNode } from 'react'
import styled from 'styled-components'
import { BottomSection, ContentHeader, Section, Wrapper } from './helpers'

interface ConfirmationModalContentProps {
  title: string
  onDismiss: () => void
  topContent: () => ReactNode
  bottomContent: () => ReactNode
}

const StyledBodyContainer = styled.div`
  overflow-y: auto;
  max-height: 80vh;

  > div:nth-child(2) {
    padding: 0 20px;
  }
`
const ConfirmationModalContent = ({ title, bottomContent, onDismiss, topContent }: ConfirmationModalContentProps) => {
  return (
    <Wrapper>
      <ContentHeader onDismiss={onDismiss}>{title}</ContentHeader>
      <StyledBodyContainer>
        <Section>{topContent()}</Section>
        <BottomSection gap='12px'>{bottomContent()}</BottomSection>
      </StyledBodyContainer>
    </Wrapper>
  )
}

export default ConfirmationModalContent
