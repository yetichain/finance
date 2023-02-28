import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

const Wrapper = styled.div`
  background-color: #dfe4ff;
  background-image: url(/images/farms/banners/farm-banner.png);
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 6px;
  height: 360px;
  position: relative;
  overflow: hidden;

  @media ${mq.down(breakpoints.lg)} {
    height: 250px;
  }

  @media ${mq.down(breakpoints.sm)} {
    height: 320px;
    background-position: top;
    background-image: url(/images/farms/banners/farm-banner-small.png);
  }
`

const Labels = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  width: 320px;
  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 72px;
    letter-spacing: 0.3px;
    color: #0b1359;
    padding-bottom: 16px;
  }
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  @media ${mq.down(breakpoints.sm)} {
    width: 100%;
    padding: 0;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding-top: 24px;
    h1 {
      font-size: 32px;
      line-height: 40px;
    }
    h3 {
      font-size: 16px;
      line-height: 22px;
    }
  }
`

const FarmBanner = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Labels>
        <h1>{t('Farms')}</h1>
        <h3>{t('Stake LP tokens to earn')}</h3>
      </Labels>
    </Wrapper>
  )
}

export default FarmBanner
