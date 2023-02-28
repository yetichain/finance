import { Button, Text } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { useCallback, useState } from 'react'
import { AlertTriangle } from 'react-feather'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import Modal from '../Modal'
import { AutoRow, RowBetween } from '../Row'
import { TYPE } from '../Shared'

const { main: Main, body: Body } = TYPE

const WarningContainer = styled.div`
  max-width: 420px;
  width: 100%;
  padding: 1rem;
  background: rgba(242, 150, 2, 0.05);
  border: 1px solid #f3841e;
  border-radius: 20px;
  overflow: auto;
`

const StyledWarningIcon = styled(AlertTriangle)`
  stroke: ${({ theme }) => theme.colors.failure};
`

export default function SyrupWarningModal({
  isOpen,
  transactionType,
  onConfirm,
}: {
  isOpen: boolean
  transactionType: string
  onConfirm: () => void
}) {
  const [understandChecked, setUnderstandChecked] = useState(false)
  const toggleUnderstand = useCallback(() => setUnderstandChecked((uc) => !uc), [])
  const { t } = useTranslation()
  const handleDismiss = useCallback(() => null, [])
  return (
    <Modal isOpen={isOpen} onDismiss={handleDismiss} maxHeight={90}>
      <WarningContainer className='token-warning-container'>
        <AutoColumn gap='lg'>
          <AutoRow gap='6px'>
            <StyledWarningIcon />
            <Main color='failure'>{t('syrupWarning')}</Main>
          </AutoRow>
          {transactionType !== '' && (
            <>
              <Body color='failure'>
                {t('beCarefulWhen')} <strong>{transactionType}</strong> {t('syrup')}.
              </Body>
              <Body color='failure'>{transactionType === 'Buying' ? t('willNotReceiveALM') : t('needBuyBack')}</Body>
            </>
          )}
          <RowBetween>
            <div>
              <label htmlFor='understand-checkbox' style={{ cursor: 'pointer', userSelect: 'none' }}>
                <input
                  id='understand-checkbox'
                  type='checkbox'
                  className='understand-checkbox'
                  checked={understandChecked}
                  onChange={toggleUnderstand}
                />{' '}
                <Text as='span'>{t('iUnderstand')}</Text>
              </label>
            </div>
            <Button
              disabled={!understandChecked}
              variant='danger'
              style={{ width: '140px' }}
              onClick={() => {
                setUnderstandChecked(false)
                onConfirm()
              }}
            >
              {t('continue')}
            </Button>
          </RowBetween>
        </AutoColumn>
      </WarningContainer>
    </Modal>
  )
}
