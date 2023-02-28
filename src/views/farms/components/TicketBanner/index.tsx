import { WarningIcon } from 'alium-uikit/src'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useActiveWeb3React } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { useFarmTicket } from 'views/farms/hooks/useFarmTicket'
import { FarmContentXLGap } from '../FarmContent'
import { BuyTicketBtn } from './BuyTicketBtn'

// TODO: use mq.breakpoints???
const External_breakpoints = {
  XL: mq.down(breakpoints.xl - FarmContentXLGap),
  MID_LG: mq.down(breakpoints.lg - 20),
  PRE_LG: mq.down(breakpoints.lg - 100),
  MD: mq.down(breakpoints.md),
  SM: mq.down(breakpoints.sm - 80),
}

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const FlexEnd = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  @media ${External_breakpoints.SM} {
    justify-content: flex-start;
    flex-direction: column;
    align-items: baseline;
  }
`

const Wrapper = styled.div`
  position: relative;
  background: #6c5dd3;
  border-radius: 6px;
  max-height: 96px;
  margin-bottom: 36px;
  display: grid;
  grid-template-columns: 48px 440px 4fr auto;
  grid-gap: 16px;
  align-items: center;
  padding-right: 24px;
  @media ${External_breakpoints.XL} {
    grid-template-columns: 48px 326px 4fr auto;
  }
  @media ${External_breakpoints.PRE_LG} {
    grid-template-columns: 48px 277px 4fr auto;
  }
  @media ${External_breakpoints.MD} {
    grid-template-columns: repeat(auto-fit);
  }
  @media ${External_breakpoints.SM} {
    max-height: none;
    height: auto;
    grid-template-columns: 1fr;
    padding: 16px 16px 16px 56px;
    grid-gap: 8px;
  }
  overflow: hidden;
`

const Warning = styled(FlexCenter)`
  background: #5849bd;
  border-radius: 6px 0px 0px 6px;
  width: 48px;
  height: 96px;
  padding: 0 10px;

  svg {
    fill: none;
  }
  @media ${External_breakpoints.XL} {
    width: 40px;
  }
  @media ${External_breakpoints.SM} {
    position: absolute;
    left: 0;
    height: 100%;
  }
`

const Info = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #ffffff;
  max-width: 440px;
  @media ${External_breakpoints.XL} {
    max-width: 326px;
    font-size: 18px;
    line-height: 24px;
  }
  @media ${External_breakpoints.MD} {
    font-size: 14px;
    line-height: 20px;
    max-width: 261px;
  }
  @media ${External_breakpoints.SM} {
    max-width: none;
    width: 100%;
  }
`

const Illustration = styled.img`
  max-width: 400px;
  width: 100%;
  height: 96px;
  @media ${External_breakpoints.XL} {
    max-width: 234px;
    object-fit: contain;
    max-height: 96px;
  }
  @media ${External_breakpoints.MID_LG} {
    transform: translateX(0%) translateY(15%);
  }
  @media ${External_breakpoints.PRE_LG} {
    display: none;
  }
`

const TicketInfo = styled.div`
  display: flex;
  align-items: center;
  p {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: #cbc8ee;
    max-width: 69px;
    @media ${External_breakpoints.SM} {
      max-width: none;
    }
  }
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.3px;
    margin-left: 16px;
    color: #ffffff;
    @media ${External_breakpoints.MD} {
      font-size: 24px;
      line-height: 30px;
    }
  }
  margin-right: 40px;
  @media ${External_breakpoints.XL} {
    margin-right: 24px;
  }
  @media ${External_breakpoints.SM} {
    margin-bottom: 8px;
  }
`

const StyledConnectWallet = styled(ConnectWalletButton)`
  max-width: 340px;
  width: 100% !important;
  background: #1ea76d;
  &:hover {
    background: #3c9c73 !important;
  }
`

const TicketBanner = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const isXl = useMedia(External_breakpoints.XL)
  const removeBanner = useMedia(External_breakpoints.SM)
  const imgSrc = isXl ? 'farm-ticket-banner-lg.png' : 'farm-ticket-banner.png'
  const { hasTicket } = useFarmTicket()
  if (hasTicket) {
    return <></>
  }
  return (
    <Wrapper>
      <Warning>
        <WarningIcon />
      </Warning>
      <Info>{t('Only users who have bought a ticket can take part in the farming program')}</Info>
      {!removeBanner && (
        <FlexCenter>
          <Illustration src={`/images/farms/banners/${imgSrc}`} />
        </FlexCenter>
      )}
      <FlexEnd>
        <TicketInfo>
          <p>{t('The ticket price is:')}</p>
          <h2>1500 YET</h2>
        </TicketInfo>
        {!account ? <StyledConnectWallet title={t('Connect Wallet')} /> : <BuyTicketBtn />}
      </FlexEnd>
    </Wrapper>
  )
}

export default TicketBanner
