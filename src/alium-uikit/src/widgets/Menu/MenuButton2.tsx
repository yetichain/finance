import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

export const MenuButton2 = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;

  border-radius: 6px;
  border: 1px solid #d2d6e5;
  width: 40px;
  height: 40px;

  @media ${mq.up(breakpoints.sm)} {
    padding: 0 8px;
    width: 48px;
    height: 48px;
  }

  @media ${mq.up(breakpoints.md)} {
    display: none;
  }
`
