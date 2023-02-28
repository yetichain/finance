import { Button } from 'alium-uikit/src'
import { ShadowComponent } from 'components/Main/ShadowComponent'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import { BridgeTransferErrorIcon } from 'images/bridge/BridgeTransferErrorIcon'
import { TFunction, useTranslation } from 'next-i18next'
import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FarmActionModalProps } from './FarmActionModal'
import { ModalFarmBaseWrap } from './modals.styled'

interface ActionFarmProps {
  loading: boolean
  success: boolean
  error: boolean
  children: React.ReactNode
  type: FarmActionModalProps['type']
  onRepeat: () => void
}

export const FarmModalStatuses = ({ loading, success, error, children, type, onRepeat }: ActionFarmProps) => {
  const { t } = useTranslation()
  const hideOn = loading || success || error

  return (
    <FarmModalStatuses.Wrapper>
      {loading && <FarmModalStatuses.ActionFarmLoader t={t} />}
      {success && <FarmModalStatuses.ActionFarmSuccess t={t} type={type} />}
      {error && <FarmModalStatuses.ActionFarmError t={t} onRepeat={onRepeat} />}
      <ShadowComponent hide={hideOn} style={{ width: '100%' }}>
        {children}
      </ShadowComponent>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.ActionFarmLoader = ({ t }: { t: TFunction }) => {
  return (
    <FarmModalStatuses.Wrapper>
      <FarmModalStatuses.Loading type='TailSpin' color='#6C5DD3' />
      <h3 className='wait'>{t('Wait a moment please')}</h3>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.ActionFarmSuccess = ({ type, t }: { type: FarmActionModalProps['type']; t: TFunction }) => {
  const isStake = type === 'stake'
  const title = isStake ? t('Staked') : t('Unstaked')
  return (
    <FarmModalStatuses.Wrapper>
      <BridgeSuccessIcon />
      <h2>{title}</h2>
      <p>{isStake ? t('Your funds have been staked in the farm') : t('Your funds have been unstaked in the farm')}</p>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.ActionFarmError = ({ t, onRepeat }: { t: TFunction; onRepeat: () => void }) => {
  return (
    <FarmModalStatuses.Wrapper>
      <FarmModalStatuses.IconWrap>
        <BridgeTransferErrorIcon />
      </FarmModalStatuses.IconWrap>
      <h2 className='error-text'>{t('Transaction failed')}</h2>
      <Button onClick={onRepeat} className='repeat'>
        {t('Repeat')}
      </Button>
    </FarmModalStatuses.Wrapper>
  )
}

FarmModalStatuses.IconWrap = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 77, 0, 0.1);
  border-radius: 50px;
`

FarmModalStatuses.Wrapper = styled(ModalFarmBaseWrap)`
  min-height: 277px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .wait {
    margin-top: 34px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 24px;
  }

  p {
    margin-top: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
  }

  .error-text {
    width: 70%;
    text-align: center;
  }
  .repeat {
    margin-top: 24px;
  }
`

FarmModalStatuses.Loading = styled(Loader)`
  width: 80px;
  height: 80px;
`
