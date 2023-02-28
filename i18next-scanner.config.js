/* eslint-disable @typescript-eslint/no-require-imports */
const typescriptTransform = require('i18next-scanner-typescript')
const { i18n, defaultNS, ns, keySeparator, nsSeparator } = require('./next-i18next.config')

module.exports = {
  options: {
    removeUnusedKeys: true,
    debug: true,
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    defaultLng: i18n.defaultLocale,
    lngs: i18n.locales,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
    },
    ns,
    defaultNs: defaultNS,
    defaultValue(lng, ns, key) {
      return lng === i18n.defaultLocale ? key : '__NOT_TRANSLATED__'
    },
    nsSeparator,
    keySeparator,
  },
  transform: typescriptTransform(),
}
