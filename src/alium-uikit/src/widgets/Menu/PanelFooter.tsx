import { SocialNetworks } from 'alium-uikit/src/components/SocialNetworks'
import { FC } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import LanguageSwitch from '../LanguageSwitch'
import { PanelProps, PushedProps } from './types'

interface Props extends PanelProps, PushedProps {}

const PanelFooter: FC<Props> = ({ ispushed }) => {
  const isDownMd = useMedia(mq.down(breakpoints.md))
  return (
    <>
      <SocialNetworks ispushed={ispushed} inPanel />
      {ispushed && isDownMd && <StyledLanguageSwitch inPanel />}
    </>
  )
}

const StyledLanguageSwitch = styled(LanguageSwitch)`
  margin: 0 24px 32px;
`

export default PanelFooter
