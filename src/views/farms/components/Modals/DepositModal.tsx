import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import FarmActionModal, { FarmActionModalProps } from './FarmActionModal'

const DepositModal: FC<Omit<FarmActionModalProps, 'title' | 'type'>> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
}) => {
  const { t } = useTranslation()
  const title = t('Stake LP tokens')

  return (
    <FarmActionModal
      max={max}
      onConfirm={onConfirm}
      onDismiss={onDismiss}
      tokenName={tokenName}
      farm={farm}
      almPrice={almPrice}
      title={title}
      type='stake'
    />
  )
}

export default DepositModal
