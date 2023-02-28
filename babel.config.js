const plugins = [['styled-components', { ssr: true }]]
const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  plugins.push(['transform-remove-console', { exclude: ['error'] }])
}

module.exports = {
  presets: ['next/babel'],
  plugins: plugins,
}
