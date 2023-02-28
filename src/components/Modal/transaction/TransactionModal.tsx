import { DialogContent, DialogOverlay } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { transparentize } from 'polished'
import React, { FC, HTMLAttributes, ReactNode, RefObject } from 'react'
import { isMobile } from 'react-device-detect'
import { animated, useTransition } from 'react-spring'
import styled, { css } from 'styled-components'
import { IconClose } from 'views/Migrate/components/IconClose'

export const TransactionWrapper = styled.div`
  width: 500px;
  min-height: 363px;
  padding: 8px;

  @media screen and (max-width: 768px) {
    max-width: 354px;
  }
`
export const TransactionIndicateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
`

const AnimatedDialogOverlay = animated(DialogOverlay)

const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 21;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(11, 19, 89, 0.9);
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
    background-color: ${({ theme }) => theme.colors.invertedContrast};
    box-shadow: 0 4px 8px 0 ${transparentize(0.95, '#191326')};
    padding: 0;
    width: fit-content;
    overflow: hidden;
    align-self: center;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: 100vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 6px;
  }
`

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: RefObject<any>
  children?: ReactNode
}

const TransactionModal = ({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 70,
  initialFocusRef,
  children,
}: ModalProps) => {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay key={key} style={props} onDismiss={onDismiss} initialFocusRef={initialFocusRef}>
              <StyledDialogContent
                aria-label='dialog content'
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          ),
      )}
    </>
  )
}

const Close = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all ease;
  &:hover {
    opacity: 0.5;
  }
`
type CloseProps = HTMLAttributes<HTMLDivElement> & {}
export const CloseItem: FC<CloseProps> = (props) => {
  return (
    <Close {...props}>
      <IconClose />
    </Close>
  )
}

export default TransactionModal
