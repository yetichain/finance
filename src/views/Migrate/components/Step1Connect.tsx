import UnlockButton from 'components/ConnectWalletButton'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import styled from 'styled-components'

export const Step1Connect: FC = () => {
  const { t } = useTranslation()

  return (
    <StepOne>
      <div className='title'>{t('Migrate YETI Liquidity')}</div>
      <div className='sub-title'>{t('Connect to a wallet to view your liquidity')}</div>
      <div className='button-wrap'>
        <UnlockButton alt />
      </div>
    </StepOne>
  )
}

// styles

export const StepOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 35px 0 40px 0;

  .title {
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0.3px;
  }

  .sub-title {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.3px;

    color: #8990a5;
    margin: 8px 0 24px 0;
  }
`
