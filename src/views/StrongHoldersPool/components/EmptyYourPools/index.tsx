import { Card } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'
import { ReactComponent as Icon } from './icon.svg'

export default function EmptyYourPools() {
  const { t } = useTranslation()
  return (
    <EmptyYourPools.Root>
      <Icon />
      <EmptyYourPools.Text>{t("You don't have active pools yet")}</EmptyYourPools.Text>
    </EmptyYourPools.Root>
  )
}

EmptyYourPools.Text = styled.div`
  ${typography.h6}
  text-align: center;
  color: #0b1359;
  margin-top: 16px;
`

EmptyYourPools.Root = styled(Card)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 366px;

  @media ${mq.down(breakpoints.sm)} {
    min-height: 248px;

    ${EmptyYourPools.Text} {
      ${typography.regular.medium}
    }
  }
`
