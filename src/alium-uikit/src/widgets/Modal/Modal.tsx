import { FC } from 'react'
import styled from 'styled-components'
import { IconButton } from '../../components/Button'
import Flex from '../../components/Flex/Flex'
import Heading from '../../components/Heading/Heading'
import { ArrowBackIcon, CloseIcon } from '../../components/Svg'
import { InjectedProps } from './types'

interface Props extends InjectedProps {
  title: string
  hideCloseButton?: boolean
  onBack?: () => void
  bodyPadding?: string
  styledModalContent?: any
  withoutContentWrapper?: boolean
}

const StyledModal = styled.div`
  background: ${({ theme }) => theme.modal.background};
  box-shadow: 0 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  overflow-y: auto;
  overflow-x: hidden;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: 360px;
    max-width: 100%;
    margin: 0 10px;
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9eaeb;
  align-items: center;
  padding: 16px 24px;
`

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`
const ModalContent = styled(Flex)`
  padding: 30px 24px;
  box-sizing: border-box;
`

const StyledHeading = styled(Heading)`
  font-size: 18px;
  line-height: 24px;
`

const StyledButton = styled.button`
  cursor: pointer;
  outline: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d2d6e5;
  border-radius: 4px;
  background: #fff;
  transition: background-color 200ms ease-in-out;

  :hover {
    background-color: #d2d6e5;
  }
`

const Modal: FC<Props> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = '24px',
  styledModalContent,
  withoutContentWrapper,
}) => (
  <StyledModal>
    <ModalHeader>
      <ModalTitle>
        {onBack && (
          <IconButton variant='text' onClick={onBack} area-label='go back' mr='8px'>
            <ArrowBackIcon color='primary' />
          </IconButton>
        )}
        <StyledHeading>{title}</StyledHeading>
      </ModalTitle>
      {!hideCloseButton && (
        <StyledButton onClick={onDismiss} aria-label='Close the dialog'>
          <CloseIcon color='primary' />
        </StyledButton>
      )}
    </ModalHeader>
    {withoutContentWrapper ? (
      children
    ) : (
      <ModalContent p={bodyPadding} flexDirection='column' style={styledModalContent}>
        {children}
      </ModalContent>
    )}
  </StyledModal>
)

export default Modal
