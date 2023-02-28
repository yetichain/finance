import { getMainDomain } from 'alium-uikit/src/util/getMainDomain'
import { MENU_HEIGHT } from 'alium-uikit/src/widgets/Menu/config'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { SocialNetworks } from '../../components/SocialNetworks'
import { Text } from '../../components/Text'
import { ReactComponent as NotfoundPreview } from './assets/404.svg'
import { ReactComponent as CloudLeft } from './assets/background-cloud-left.svg'
import { ReactComponent as CloudRight } from './assets/background-cloud-right.svg'

interface PropsType {
  redirectURL?: string
}

const NotFound: FC<PropsType> = ({ redirectURL = `https://${getMainDomain()}` }) => {
  const { t } = useTranslation()
  return (
    <StyledWrapper>
      <ImageWrapper>
        <NotfoundPreview />
      </ImageWrapper>
      <InfoWrapper>
        <StyledHeading>{t('Oops, your force is not strong enough')}</StyledHeading>
        <StyledText>{t('This page you requested could not be found. May the force be with you!')}</StyledText>

        <a href={redirectURL} rel='noreferrer noopener'>
          <StyledButton>{t('Back to main site')}</StyledButton>
        </a>

        <StyledText className='small'>{t('Or subscribe to our social networks')}</StyledText>

        <SocialNetworks />
      </InfoWrapper>

      <CloudsWrapper>
        <CloudWrapper className='left'>
          <CloudLeft />
        </CloudWrapper>
        <CloudWrapper className='right'>
          <CloudRight />
        </CloudWrapper>
      </CloudsWrapper>
    </StyledWrapper>
  )
}

export default NotFound

// styles

const StyledWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${MENU_HEIGHT}px);
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  overflow: auto;
  overflow-x: hidden;

  @media screen and (max-width: 1439px) {
    flex-direction: column;
    justify-content: flex-start;
  }

  @media screen and (max-width: 768px) {
    padding: 32px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  min-width: 300px;
  max-width: 558px;
  margin-right: 30px;

  @media screen and (max-width: 1439px) {
    margin-right: inherit;
    margin-top: 30px;
    align-items: center;

    & > * {
      text-align: center;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

const ImageWrapper = styled.div`
  margin-top: -54px;

  @media screen and (max-width: 1439px) {
    margin-top: inherit;

    & > svg {
      width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: inherit;

    & > svg {
      width: 100%;
      height: auto;
    }
  }
`

const CloudsWrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  height: calc(100vh - ${MENU_HEIGHT}px);
  width: 100vw;
  overflow: hidden;
`

const CloudWrapper = styled.div`
  position: absolute;
  z-index: -1;

  &.left {
    top: calc(50% - 552px);
    left: calc(50% - 888px);
  }

  &.right {
    right: calc(50% - 750px);
    bottom: calc(50% - 970px);
  }

  @media screen and (max-width: 1439px) {
    &.left {
      top: -134px;
      left: calc(50% - 682px);
    }

    &.right {
      right: calc(50% - 955px);
      top: 655px;
      bottom: inherit;
    }
  }
`

const StyledHeading = styled(Heading)`
  font-weight: bold;
  font-size: 64px;
  line-height: 72px;

  @media screen and (max-width: 768px) {
    font-size: 56px;
    line-height: 64px;
  }
  @media screen and (max-width: 480px) {
    font-size: 32px;
    line-height: 40px;
  }
`

const StyledText = styled(Text)`
  max-width: 430px;
  min-width: 300px;
  font-size: 24px;
  line-height: 30px;
  margin: 24px 0 40px 0;
  letter-spacing: 0.3px;
  color: #8990a5;

  &.small {
    margin: 24px 0 30px 0;
    font-size: 16px;
    line-height: 22px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 20px;
    width: 100%;
  }
`

const StyledButton = styled(Button)`
  margin: 0 auto 38px auto;

  @media screen and (max-width: 1024px) {
    display: block;
  }
  @media screen and (max-width: 480px) {
    margin: 20px auto;
  }
`
