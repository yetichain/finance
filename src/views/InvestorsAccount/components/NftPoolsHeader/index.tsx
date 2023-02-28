import { Flex } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

function NftPoolsHeader() {
  const { t } = useTranslation()

  return (
    <NftPoolsHeaderWrap>
      <Field maxWidth='310px'>{t('pool')}</Field>
      <Field maxWidth='96px'>{t('Total YETs')}</Field>
      <Field maxWidth='96px'>{t('Locked')}</Field>
      <Field maxWidth='172px'>{t('Unlocked')}</Field>
      <FieldEnd maxWidth='80px'>{t('Claimed')}</FieldEnd>
      <FieldEnd maxWidth='140px'>{t('Next unlocked date')}</FieldEnd>
    </NftPoolsHeaderWrap>
  )
}

export default NftPoolsHeader

// styles

const NftPoolsHeaderWrap = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #ebedf9;
  border-radius: 6px;
  width: 100%;
  padding: 16px 24px;

  @media (max-width: 1024px) {
    display: none;
  }
`

const Field = styled(Flex)<{ maxWidth: string }>`
  font-style: normal;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #8990a5;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  flex: 1;
`

const FieldEnd = styled(Field)`
  justify-content: flex-end;
`
