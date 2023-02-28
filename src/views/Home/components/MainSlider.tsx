import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'

export default function MainSlider() {
  return <CyberCitySlide />
}

const SlideTitle = styled.div`
  ${typography.h3}
  margin-bottom: 8px;
  white-space: pre-wrap;
`
const SlideDescription = styled.div`
  ${typography.ultrasmall.regular}
  margin-bottom: 24px;
`
const SlideAction = styled.button`
  background: #24ba7b;
  padding: 14px 24px;
  display: inline-flex;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #ffffff;
`
const Slide = styled.div`
  background: #6c5dd3;
  color: #fff;
  border-radius: 6px;
  height: 380px;
  padding: 70px 40px;
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${mq.down(breakpoints.lg)} {
    height: 280px;
    padding: 32px 34px;

    ${SlideTitle} {
      ${typography.h6}
    }

    ${SlideDescription} {
      margin-bottom: 16px;
    }
  }

  @media ${mq.down(breakpoints.md)} {
    padding: 32px 24px;
  }

  @media ${mq.down(breakpoints.sm)} {
    height: 500px;
    padding: 24px;
    background-position: center bottom;
    align-items: center;
    text-align: center;

    ${SlideTitle} {
      ${typography.h5}
    }
  }
`

const CyberCitySlide = styled(({ className }) => {
  const { t } = useTranslation()
  return (
    <Slide className={className}>
      <SlideTitle>{t('Genesis NFT Drop is Soon!')}</SlideTitle>
      <SlideDescription>
        {t('Stake to Earn with open economy and 10 000 cool and exciting #YETI NFT Characters')}
      </SlideDescription>
      <SlideAction as='a' href='https://docs.yetichain.com/' target='_blank' rel='noreferrer noopener'>
        {t('Learn more')}
      </SlideAction>
    </Slide>
  )
})`
  background-image: url(/images/home-new/slider/cyber-city-bg.png);

  ${SlideTitle} {
    max-width: 329px;
  }

  ${SlideDescription} {
    max-width: 250px;
  }

  @media ${mq.down(breakpoints.sm)} {
    ${SlideTitle} {
      max-width: 165px;
    }

    ${SlideDescription} {
      max-width: 254px;
    }
  }
`
