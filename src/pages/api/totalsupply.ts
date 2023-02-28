import { formatUnits } from '@ethersproject/units'
import axios from 'axios'
import { isDev } from 'config'
import { NextApiRequest, NextApiResponse } from 'next'

const url = isDev ? 'https://api-testnet.bscscan.com/api' : 'https://api.bscscan.com/api'
const contractaddress = process.env.APP_NFT_ALIUM_TOKEN
const apikey = process.env.APP_BSCSCAN_API_KEY

const ttl = 5000
let expiresAt = 0
let totalSupply = '0'

async function fetchTotalSupply() {
  if (Date.now() - expiresAt > ttl) {
    try {
      expiresAt = Date.now() + ttl

      const { data } = await axios.get<{ status: string; result: string }>(url, {
        params: {
          module: 'stats',
          action: 'tokencsupply',
          contractaddress,
          apikey,
        },
      })

      if (data.status !== '1') {
        throw new Error(data.result)
      }

      totalSupply = formatUnits(data.result)
    } catch (error) {
      console.error('fetchTotalSupply failed', error)
    }
  }
  return totalSupply
}

export default async function handler(_: NextApiRequest, res: NextApiResponse<string>) {
  res.json(await fetchTotalSupply())
}
