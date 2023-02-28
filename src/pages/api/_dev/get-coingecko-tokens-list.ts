import { isProduction } from 'config'
import fs from 'fs'
import path from 'path'
import { fetchCoinListCoingecko } from 'services/coingecko'

const storeData = (data, _path) => {
  try {
    fs.writeFileSync(path.resolve(__dirname, _path), JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const handler = async (req, res) => {
  if (isProduction) {
    res.end()
    return
  }

  const response = await fetchCoinListCoingecko()

  let data = {}
  response?.data?.forEach(({ id, symbol }) => {
    data = { ...data, [symbol.toLowerCase()]: id }
  })

  storeData(data, '../../../../.coingecko-tokens-list.json')

  res.status(200).json('ok')
}

export default handler
