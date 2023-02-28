import useOnClickOutside from 'hooks/useOnClickOutside'
import { FC, ReactElement, ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '../../components/Svg'
// import { MENU_ENTRY_HEIGHT } from './config'
import { LinkLabel, MenuEntry } from './MenuEntry'
import { PushedProps } from './types'

interface Props extends PushedProps {
  label: ReactNode
  icon: ReactElement
  initialOpenState?: boolean
  className?: string
  active?: boolean
}

const Container = styled.div<{ isOpen: boolean; active: boolean; ispushed: boolean }>`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
  div:first-child > div {
    margin-left: 8px;
    padding-bottom: 2px;
    ${({ isOpen, active }) => Boolean(isOpen || active) && `color: #24BA7B;`}
  }
  div:first-child {
    ${({ isOpen, active, ispushed }) => Boolean(isOpen || active) && ispushed && `padding-bottom: 10px;`}
  }

  div:first-child > svg * {
    ${({ isOpen, active }) => Boolean(isOpen || active) && `stroke: #24BA7B;`}
  }

  background: #ffffff;
  box-shadow: ${({ isOpen, active }) => Boolean(isOpen || active) && `0px 6px 12px rgba(185, 189, 208, 0.4);`};
  border-radius: 6px;
`

const AccordionContent = styled.div<{
  isOpen: boolean
  ispushed: boolean
}>`
  max-height: ${({ isOpen }) => (isOpen ? `fit-content` : 0)};

  transition: max-height 0.3s ease-out;
  overflow: hidden;
  /* margin-top: ${({ isOpen }) => (isOpen ? `10px` : 0)}; */

  > div > a {
    padding-left: 25px;
    color: #8990a5;
    margin-top: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    height: auto;
  }

  div {
    height: auto;
    padding-top: 0px;
    padding-bottom: 0px !important;

    &:first-child {
      a {
        margin-top: 0;
      }
    }
    &:last-child {
      a {
        margin-bottom: 14px;
      }
    }
  }
`

const Accordion: FC<Props> = ({
  label,
  icon,
  active,
  ispushed,
  pushNav,
  initialOpenState = false,
  children,
  className,
}) => {
  const accordRef = useRef()
  const [isOpen, setIsOpen] = useState(initialOpenState)

  const handleClick = () => {
    if (ispushed) {
      setIsOpen((prevState) => !prevState)
    } else {
      pushNav(true)
      setIsOpen(true)
    }
  }

  useOnClickOutside(accordRef, () => {
    // timeout when click another item in menu
    setTimeout(() => {
      setIsOpen(false)
    }, 150)
  })
  return (
    <Container isOpen={isOpen} ref={accordRef} active={active} ispushed={ispushed}>
      <MenuEntry onClick={handleClick} className={className}>
        {icon}
        <LinkLabel ispushed={ispushed}>{label}</LinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent
        isOpen={isOpen}
        ispushed={ispushed}
        // maxHeight={Children.count(children) * MENU_ENTRY_HEIGHT}
      >
        {children}
      </AccordionContent>
    </Container>
  )
}

export default Accordion
