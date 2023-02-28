import { ArrowBackIcon, Flex } from 'alium-uikit/src'
import { NextLink } from 'components/NextLink'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween } from 'components/Row'
import { useTranslation } from 'next-i18next'
import { ROUTES } from 'routes'
import styled from 'styled-components'

export function FindPoolTabs() {
  const { t } = useTranslation()
  return (
    <Tabs>
      <StyledRowBetween style={{ borderBottom: '1px solid #f4f5fa' }}>
        <Flex alignItems='center'>
          <NextLink href={ROUTES.pool}>
            <ArrowBackIcon width='24px' height='24px' />
          </NextLink>
          <ActiveText>{t('Import Pool')}</ActiveText>
          <QuestionHelper text={t("Use this tool to find pairs that don't automatically appear in the interface")} />
        </Flex>
      </StyledRowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  const { t } = useTranslation()
  return (
    <Tabs>
      <StyledRowBetween style={{ borderBottom: '1px solid #f4f5fa' }}>
        <Flex alignItems='center'>
          <NextLink href={ROUTES.pool}>
            <ArrowBackIcon width='24px' height='24px' />
          </NextLink>
          <ActiveText>
            {adding ? t('Add') : t('Remove')} {t('Liquidity')}
          </ActiveText>
        </Flex>
        <QuestionHelper
          text={
            adding
              ? t(
                  'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.',
                )
              : t(
                  'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.',
                )
          }
          bordered
        />
      </StyledRowBetween>
    </Tabs>
  )
}

// styles

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const ActiveText = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-left: 16px;
  letter-spacing: -0.3px;
`

const StyledRowBetween = styled(RowBetween)`
  padding: 32px 32px 22px;

  @media screen and (max-width: 500px) {
    padding: 24px 32px 20px;
  }
`
