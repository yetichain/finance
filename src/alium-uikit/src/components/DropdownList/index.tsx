import useOnClickOutside from 'hooks/useOnClickOutside'
import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { ChevronDownIcon } from '../Svg'

interface StyledDropdown {
  toggled: boolean
}
const DefaultDropdown = styled.div<{ disabled: boolean; toggled: boolean }>`
  position: relative;
  width: 220px;
  height: 48px;
  background: white;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #0b1359;

  user-select: none;
  opacity: ${(props) => (props.disabled ? '0.7' : '1')};
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'auto')};
  svg {
    transform: ${(props: StyledDropdown) => (props.toggled ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`
const HeadDropdown = styled.div<{ disabled: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'auto')};
  padding: 14px 16px 14px 16px;
  &:hover {
    opacity: 0.7;
  }
`
const StyledDropdownList = styled.div`
  position: absolute;
  z-index: 999999;
  width: ${(props: StyledDropdown) => (props.toggled ? '100%' : '0px !important')};
  left: 0;
  background: white;
  box-shadow: 0 6px 12px rgb(185 189 208 / 40%);
  border-radius: 6px;
  opacity: ${(props: StyledDropdown) => (props.toggled ? '1' : '0 !important')};
  height: ${(props: StyledDropdown) => (props.toggled ? 'auto' : '0px !important')};
  box-sizing: border-box;
`
interface StyledItemProps {
  active: boolean
}
const Item = styled.div<{ disabled: boolean; active: boolean }>`
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  background: ${(props: StyledItemProps) => (props.active ? '#F5F7FF' : 'transparent')};
  color: ${(props: StyledItemProps) => (props.active ? '#0B1359' : '#8990A5')};
  padding: 14px 18px 12px 18px;
  width: 100%;
`

type Props = {
  extends?: HTMLAttributes<HTMLDivElement>
  style?: React.CSSProperties
  select?: (item: string) => void
  active: string
  list: string[]
  disabled?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export const DropdownList: FC<Props> = ({ active, list, style, select, disabled, ...other }) => {
  const ref = React.useRef(null)
  const [toggled, setToggle] = useState(false)
  const toggle = () => {
    !disabled && setToggle(!toggled)
  }
  const close = () => {
    if (toggled) {
      !disabled && setToggle(false)
    }
  }
  useOnClickOutside(ref, close)
  return (
    <DefaultDropdown {...other} style={style} toggled={toggled} ref={ref} disabled={disabled}>
      <HeadDropdown onClick={toggle} disabled={disabled}>
        {active || '-'}
        <ChevronDownIcon />
      </HeadDropdown>
      <StyledDropdownList toggled={toggled}>
        {toggled &&
          list?.length &&
          list.map((item, index) => (
            <Item
              disabled={disabled}
              onClick={() => (select ? select(item) : null)}
              key={index.toString()}
              active={item === active}
            >
              {item}
            </Item>
          ))}
      </StyledDropdownList>
    </DefaultDropdown>
  )
}
