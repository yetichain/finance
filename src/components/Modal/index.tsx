import { DialogContent, DialogOverlay } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { useActiveWeb3React } from 'hooks'
import { transparentize } from 'polished'
import { ReactNode, RefObject } from 'react'
import { isMobile } from 'react-device-detect'
import { animated, useTransition } from 'react-spring'
import styled, { css } from 'styled-components'

const AnimatedDialogOverlay = animated(DialogOverlay)

const StyledDialogOverlay = styled(({ ...rest }) => <AnimatedDialogOverlay {...rest} />)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isTransparancy }) =>
      isTransparancy
        ? css`
            background-color: rgba(11, 19, 89, 0.9);
          `
        : css`
            background-color: rgba(11, 19, 89, 1);
          `}
  }
`

const AnimatedDialogContent = animated(DialogContent)

// destructure to not pass custom props to Dialog DOM element
const StyledDialogContent = styled(({ minHeight, maxHeight, padding, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  &[data-reach-dialog-overlay] {
    background-color: rgb(11, 19, 89, 0.9);
  }
  #transaction_wrapper {
    width: 100%;
    max-width: none;
  }
  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    // border: 1px solid ${({ theme }) => theme.colors.invertedContrast};/
    // background-color: ${({ theme }) => theme.colors.invertedContrast};
    box-shadow: 0 4px 8px 0 ${transparentize(0.95, '#191326')};
    width: 80%;
    overflow: hidden;
    padding: 50px;

    @media screen and (max-width: 433px) {
      padding: 45px 20px;
    }

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 600px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
  
      ${({ padding }) =>
      padding &&
      css`
        padding: ${padding};
      `}
  

    display: flex;
    border-radius: 6px;

    ${({ theme }) => theme.mediaQueries.lg} {
      width: 65vw;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 85vw;
    }
    ${({ theme }) => theme.mediaQueries.xs} {
      width: 90vw;
    }
  }
`

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  padding?: number | string
  initialFocusRef?: RefObject<any>
  children?: ReactNode
  isTransparancy?: boolean
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 50,
  padding,
  initialFocusRef,
  children,
  isTransparancy,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const { account } = useActiveWeb3React()

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
              isLogged={account}
              isTransparancy={isTransparancy}
            >
              <StyledDialogContent
                aria-label='dialog content'
                minHeight={minHeight}
                maxHeight={maxHeight}
                padding={padding}
                mobile={isMobile}
                style={{ margin: 'auto' }}
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
