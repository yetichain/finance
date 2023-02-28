const APP_ENV = process.env.APP_ENV || 'production'

const localesByEnv = {
  development: ['en', 'de', 'fr', 'fil', 'ru'],
  production: ['en'],
}

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: localesByEnv[APP_ENV],
  },
  ns: ['common'],
  defaultNS: 'common',
  debug: process.env.NODE_ENV !== 'production',
  keySeparator: false,
  nsSeparator: false,
}
