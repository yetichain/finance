const { i18n } = require('./next-i18next.config')
const APP_ENV = process.env.APP_ENV === 'development' ? 'development' : 'production'
const env = require(APP_ENV === 'development' ? './.env.development.js' : './.env.production.js')

module.exports = {
  i18n,
  env: { APP_ENV, ...env },
  generateBuildId: async () => String(Math.round(Number(new Date()) / 1000)),
  distDir: 'build',
  compress: false,
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
        {
          loader: 'url-loader',
        },
      ],
    })
    return config
  },
}
