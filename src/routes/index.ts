import { getMainDomain } from 'alium-uikit/src/util/getMainDomain'

export const ROUTES = {
  home: '/',
  // SWAP
  exchange: '/swap',
  pool: '/pool',
  add: '/add',
  migrate: '/migrate',
  addWithCurrencyA: '/add/:currencyIdA',
  addWithMultipleCurrency: '/add/:currencyIdA/:currencyIdB',
  removeTokens: '/remove/:tokens',
  removeMultiple: '/remove/:currencyIdA/:currencyIdB',
  exchangeByOne: (currencyId) => `/swap/${currencyId}`,
  exchangeByMultiple: (currencyIdA: string, currencyIdB: string) => `/swap/${currencyIdA}/${currencyIdB}`,
  addByOne: (currencyId) => `/add/${currencyId}`,
  addByMultiple: (currencyIdA: string, currencyIdB: string) => `/add/${currencyIdA}/${currencyIdB}`,
  removeByMultiple: (currencyIdA: string, currencyIdB: string) => `/remove/${currencyIdA}/${currencyIdB}`,
  farms: '/farms',
  shp: '/pools',
  shpYour: '/pools/your',
  bridge: '/bridge',
  //
  tokenHolderArea: '/account',
  collection: '/collection',
  audits: '/audits',
  public: `https://public.${getMainDomain()}`,
  profile: `https://${getMainDomain()}/profile`,
  overview: `https://info.${getMainDomain()}`,
  tokens: `https://info.${getMainDomain()}/tokens`,
  pairs: `https://info.${getMainDomain()}/pairs`,
}
