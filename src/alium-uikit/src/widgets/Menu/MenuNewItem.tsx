import { Button } from 'alium-uikit/src/components/Button'
import styled from 'styled-components'

const Item = styled(Button).attrs({ variant: 'extraGreen' })`
  width: 30px;
  height: 18px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
  line-height: 12px;
  letter-spacing: 1px;
  padding: 4px;
  text-transform: uppercase;
  &:hover {
    opacity: 0.7;
  }
`

export const MenuNewItem = () => {
  return <Item>New</Item>
}
