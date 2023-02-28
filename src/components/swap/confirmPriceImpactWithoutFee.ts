import { Percent } from '@alium-official/sdk'
import { ALLOWED_PRICE_IMPACT_HIGH, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN } from 'config/settings'
import { i18n } from 'next-i18next'

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
export default function confirmPriceImpactWithoutFee(priceImpactWithoutFee: Percent): boolean {
  if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    return (
      window.prompt(
        i18n.t(
          'This swap has a price impact of at least {{percent}}%. Please type the word "confirm" to continue with this swap.',
          { percent: PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0) },
        ),
      ) === i18n.t('confirm')
    )
  }
  if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
    return window.confirm(
      i18n.t(
        'This swap has a price impact of at least {{percent}}%. Please confirm that you would like to continue with this swap.',
        { percent: ALLOWED_PRICE_IMPACT_HIGH.toFixed(0) },
      ),
    )
  }
  return true
}
