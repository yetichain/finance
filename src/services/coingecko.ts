import axios from 'axios'

export const fetchTokenPriceFromCoingecko = (symbol: string) => {
  return axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}`)
}

export const fetchCoinListCoingecko = () => {
  return axios.get(`https://api.coingecko.com/api/v3/coins/list`)
}
