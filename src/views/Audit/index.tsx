import { Text } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import AuditItem from './components/AuditItem'
import useGetCardList, { AuditType } from './constants/audits'

const ContentHolder = styled.div`
  position: relative;
  margin: auto;
`

const CardWrapper = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  width: 100%;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: 1024px) {
    max-width: 954px;
  }

  @media screen and (max-width: 1016px) {
    padding: 0 32px 0 32px;
  }
  @media screen and (max-width: 790px) {
    padding: 0;
  }
`

const AuditListContainer = styled.div`
  > div {
    margin-bottom: 16px;
  }
`

const StyledWrapper = styled.div`
  display: flex;
`

const StyledText = styled(Text)`
  @media screen and (max-width: 740px) {
    text-align: center;
    font-size: 28px;
    margin-top: 20px;
  }
`

const AuditPage = () => {
  const { t } = useTranslation()
  const { audits } = useGetCardList()

  return (
    <StyledWrapper>
      <ContentHolder>
        <CardWrapper>
          <StyledText fontSize='48px' style={{ fontWeight: 700, marginBottom: '24px', marginTop: '40px' }}>
            {t('Our completed audits')}
          </StyledText>

          <AuditListContainer>
            {audits.map((audit: AuditType, key) => (
              <AuditItem key={key} {...audit} />
            ))}
          </AuditListContainer>
        </CardWrapper>
      </ContentHolder>
    </StyledWrapper>
  )
}

export default AuditPage
