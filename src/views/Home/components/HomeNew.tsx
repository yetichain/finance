import { Button } from 'alium-uikit/src'
import { Trans, useTranslation } from 'next-i18next'
import { ReactComponent as AppStoreIcon } from 'public/icons/AppStore.svg'
import { ReactComponent as GooglePlayIcon } from 'public/icons/GooglePlay.svg'
import { ReactComponent as PlayButtonIcon } from 'public/icons/PlayButton.svg'
import React from 'react'
import styled from 'styled-components'
import MainSlider from './MainSlider'

const md = '768px'
const lg = '1024px'
const xl = '1280px'

const Arrow = () => {
  return (
    <svg width='16' height='40' viewBox='0 0 18 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 1L17 21L1 41' stroke='#D2D6E5' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

const HomeNew = () => {
  const { t } = useTranslation()

  return (
    <>
      <MainSlider />

      <H1>{t('Road Map')}</H1>

      <RoadMapContainer>
        <CardContainer>
          <CardLogoFarming />
          <div className='card-content'>
            <div className='title'>{t('Farming Launch')}</div>
            <ExtraButton>{t('March, 2023')}</ExtraButton>
          </div>
        </CardContainer>

        <div className='arrow__container'>
          <Arrow />
        </div>

        <CardContainer>
          <CardLogoCross />
          <div className='card-content'>
            <div className='title'>{t('Cross-blockhain Swaps')}</div>
            <ExtraButton>{t('April, 2023')}</ExtraButton>
          </div>
        </CardContainer>

        <div className='arrow__container'>
          <Arrow />
        </div>

        <CardContainer>
          <CardLogoAvalanche />
          <div className='card-content'>
            <div className='title'>{t('Multichain Integration')}</div>
            <ExtraButton>{t('April, 2023')}</ExtraButton>
          </div>
        </CardContainer>
      </RoadMapContainer>

      <BuyAlmContainer>
        <img src='/images/home-new/alm-left.png' alt='Buy yet img' />
        <div>
          <H1>
            <Trans i18nKey='Buy YETI Chain <br /> (YET) token' components={{ br: <br /> }} />
          </H1>
          <h2>
            {t(
              'YETI Chain team is on the way to reach several milestones aimed on increasing of YET token value. Be ahead of the market and join the YET holders community!',
            )}
          </h2>

          <ActionButton>
            <a href='https://yetichain.finance/swap/BNB/0xC631d214F68e5FD97Fe610736c6692C5533a2F20' target='_blank'>
              {t('Buy YET')}
            </a>
          </ActionButton>
        </div>
      </BuyAlmContainer>

      <FooterContainer>
        <a className='overlay' href='https://www.youtube.com/@yetichain' target='_blank'>
          <PlayButtonIcon />
          <p>{t('How it works?')}</p>
        </a>
        <div className='left'>
          <h1>
            <div className='title'>{t('Blockchain always Accessible')}</div>
          </h1>
          <div className='social-items'>
            <SocialItem href='https://chrome.google.com/webstore/detail/yeti-web30-decentralised/odpnjmimokcmjgojhnhfcnalnegdjmdn' target='_blank'>
              <div className='icon'>
                <GooglePlayIcon />
              </div>
              <div className='info'>
                <p className='title'>{t('Get Chrome')}</p>
                <p className='social'>{t('Extension')}</p>
              </div>
            </SocialItem>
            <SocialItem href='https://chrome.google.com/webstore/detail/yeti-web30-decentralised/odpnjmimokcmjgojhnhfcnalnegdjmdn' target='_blank'>
              <div className='icon'>
                <AppStoreIcon />
              </div>
              <div className='info'>
                <p className='title'>{t('Get Brave')}</p>
                <p className='social'>{t('Extension')}</p>
              </div>
            </SocialItem>
          </div>
        </div>
      </FooterContainer>
    </>
  )
}

export default HomeNew

const H1 = styled.h1`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 28px;
  line-height: 36px;

  font-weight: bold;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;

  @media screen and (min-width: ${md}) {
    font-size: 32px;
    line-height: 40px;
  }

  @media screen and (min-width: ${xl}) {
    font-size: 40px;
    line-height: 48px;
  }
`

// RoadMapContainer

const RoadMapContainer = styled.div`
  margin-top: 32px;

  .arrow__container {
    display: none;
  }

  @media screen and (min-width: ${md}) {
    display: flex;
    justify-content: space-around;

    .arrow__container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (min-width: ${xl}) {
    margin-top: 40px;
  }
`

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  .card-content {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      text-align: left;
      width: 150px;
      color: #0b1359;
      margin: 0 0 16px;
    }
  }

  @media screen and (min-width: ${md}) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: initial;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        text-align: center;
        margin-top: 24px;
      }
    }
  }

  @media screen and (min-width: ${xl}) {
    .card-content {
      .title {
        width: 354px;
      }
    }
  }
`

const CardLogo = styled.div`
  margin-right: 24px;
  width: 120px;
  min-width: 120px;
  height: 120px;

  @media screen and (min-width: ${md}) {
    margin-right: initial;
  }
`

const CardLogoFarming = styled(CardLogo)`
  background: url('/images/home-new/farming.svg') no-repeat center/contain;
`

const CardLogoCross = styled(CardLogo)`
  background: url('/images/home-new/cross.svg') no-repeat center/contain;
`

const CardLogoAvalanche = styled(CardLogo)`
  background: url('/images/home-new/avalanche.svg') no-repeat center/contain;
`

const ExtraButton = styled(Button).attrs({ variant: 'extraRed' })`
  white-space: pre;
  width: fit-content;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  height: 28px;
`

// BuyAlmContainer

const BuyAlmContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 24px;
  margin-bottom: 32px;

  img {
    width: 306px;
    height: 272px;
  }

  h1 {
    text-align: center;
  }

  h2 {
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-bottom: 24px;
  }

  @media screen and (min-width: ${md}) {
    margin-top: 48px;
    padding: 40px 30px;
    flex-direction: row;

    img {
      width: 322px;
      height: 286.42px;
      margin-right: 16px;
    }

    h1 {
      margin-top: 0;
      text-align: left;
    }

    h2 {
      text-align: left;
    }
  }

  @media screen and (min-width: ${lg}) {
    padding: 40px;
  }

  @media screen and (min-width: ${xl}) {
    padding: 48px 94px 48px 48px;

    img {
      width: 450px;
      height: 400px;
      margin-right: 78px;
    }
  }
`

const ActionButton = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 48px;
  background: hsl(248, 57%, 60%);
  border-radius: 6px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: hsla(248, 57%, 65%);
  }

  @media screen and (min-width: ${md}) {
    margin: initial;
  }
`

// FooterContainer

const FooterContainer = styled.div`
  position: relative;
  background: url('/images/home-new/mob-image.png') no-repeat, #6c5dd3;
  background-size: cover;
  border-radius: 6px;
  height: 475px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  padding: 24px 16px;

  .social-items {
    display: flex;
    gap: 8px;
  }

  .overlay {
    width: fit-content;
    position: absolute;
    height: 64px;
    right: 16px;
    bottom: 98px;

    svg {
      transition: filter 200ms;
    }

    p {
      display: none;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin-bottom: 26px;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      letter-spacing: 0.3px;
      color: #fff;
      max-width: 222px;
    }
  }

  @media screen and (min-width: ${md}) {
    padding: 24px;
    align-items: center;
    height: 350px;
    background: url('/images/home-new/app-image.png') no-repeat center/cover, #6c5dd3;

    .social-items {
      flex-direction: column;
    }

    .overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: initial;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      svg {
        min-height: 64px;
      }

      p {
        margin-top: 16px;
        display: initial;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 1px;
        color: #fff;
      }
    }

    .left {
      h1 {
        max-width: 354px;
        font-weight: bold;
        font-size: 40px;
        line-height: 48px;
      }
    }
  }

  @media screen and (min-width: ${lg}) {
    .overlay {
      &:hover {
        svg {
          filter: drop-shadow(0px 6px 8px rgba(220, 224, 244, 0.56));
        }
      }
    }
  }

  @media screen and (min-width: ${xl}) {
    padding: 40px;

    .social-items {
      flex-direction: row;
    }
  }
`

const SocialItem = styled.a`
  background: rgba(11, 19, 89, 0.3);
  border-radius: 6px;
  width: 154px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms;

  &:hover {
    background: rgba(11, 19, 89, 0.5);
  }

  &:active {
    background: rgba(11, 19, 89, 0.5);
    box-shadow: inset 0 3px 0 rgba(11, 19, 89, 0.5);
  }

  .icon {
    margin-right: 12px;
  }

  .title {
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }

  .social {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
`
