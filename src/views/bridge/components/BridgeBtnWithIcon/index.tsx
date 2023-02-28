import { Button, ButtonProps } from 'alium-uikit/src'
import React, { FC } from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  margin-top: 16px;
  svg {
    margin-right: 20px;
  }
  /* max-width: 184px; */
`

type Props = ButtonProps & {
  children: React.ReactNode
}
const BridgeBtnWithIcon: FC<Props> = ({ children, ...other }) => {
  return <StyledButton {...other}>{children}</StyledButton>
}

export default BridgeBtnWithIcon
