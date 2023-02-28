import { isProduction } from 'config'
import fs from 'fs'
import request from 'request'
import { networkTokensLPMigrationVampiring } from 'store/network/data/networkTokensLPMigrationVampiring'
// import coingecko from '../../../../build/.coingecko-tokens-list.json'

const coingecko = {}

const download = function (uri, filename, callback) {
  request.head(uri, (err, res) => {
    console.info('content-type:', res.headers['content-type'])
    console.info('content-length:', res.headers['content-length'])

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

const handler = async (req, res) => {
  if (isProduction) {
    res.end()
    return
  }

  let alium = []
  networkTokensLPMigrationVampiring[1].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })
  networkTokensLPMigrationVampiring[56].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })
  networkTokensLPMigrationVampiring[128].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })
  networkTokensLPMigrationVampiring[137].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })

  let idsWithSymbols = []
  alium.forEach((symbol) => {
    if (coingecko[symbol]) {
      idsWithSymbols = [...idsWithSymbols, { id: coingecko[symbol], symbol }]
    }
  })

  idsWithSymbols.forEach(({ id, symbol }) => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      },
    ).then((responseRaw) => {
      responseRaw.json().then((response) => {
        console.info('response', response.image)

        download(response.image.large, `./public/images/coins-new/${symbol}.png`, () => {
          console.info('done')
        })
      })
    })
  })

  res.status(200).json('ok')
}

export default handler
