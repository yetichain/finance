import { CloseIcon } from 'alium-uikit/src'
import { FC } from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
  position: relative;
  background: ${({ theme }) => theme.modal.background};
  box-shadow: 0 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  overflow-y: auto;
  overflow-x: hidden;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    max-width: 354px;
  }
`

const StyledButton = styled.button`
  margin: 8px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  outline: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  background: #fff;
  transition: background-color 200ms ease-in-out;

  :hover {
    background-color: #d2d6e5;
  }
`

const StyledModalInner = styled.div`
  padding: 55px 40px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`

const StyledModalImage = styled.div`
  height: 142px;
  width: 160px;
  background-size: cover;

  background: url('/images/home/modal-congrats-x2.png') no-repeat center;
  background-size: cover;
`

const StyledModalText = styled.div`
  margin-top: 16px;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.3px;
  color: #0b1359;
`

interface props {
  handleClose: () => void
}

const CongratsModal: FC<props> = ({ handleClose }) => {
  return (
    <StyledModal>
      <StyledButton onClick={handleClose}>
        <CloseIcon color='primary' />
      </StyledButton>
      <StyledModalInner>
        <StyledModalImage />
        <StyledModalText>Thank you, we will inform you about the launch of the marketplace</StyledModalText>
      </StyledModalInner>
    </StyledModal>
  )
}

export default CongratsModal
