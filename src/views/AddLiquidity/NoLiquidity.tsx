import { Text as UIKitText } from 'alium-uikit/src'
import { AutoColumn, ColumnCenter } from 'components/Column'
import { useTranslation } from 'next-i18next'

export const NoLiquidity = () => {
  const { t } = useTranslation()

  return (
    <ColumnCenter>
      <AutoColumn style={{ marginTop: '-15px', marginBottom: '10px' }}>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          {t('You are the first liquidity provider.')}
        </UIKitText>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          {t('The ratio of tokens you add will set the price of this pool.')}
        </UIKitText>
        <UIKitText style={{ fontSize: '14px', color: '#8990A5', textAlign: 'center' }}>
          {t('Once you are happy with the rate click supply to review.')}
        </UIKitText>
      </AutoColumn>
    </ColumnCenter>
  )
}
