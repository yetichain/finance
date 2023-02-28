import { CookieSetOptions } from 'universal-cookie/cjs/types'

type getCookieOptions = () => CookieSetOptions

export const getCookieOptions: getCookieOptions = () => {
  const hostname = process.browser && typeof window !== 'undefined' ? window.location.hostname : 'alium.finance'
  const arr = hostname.split('.')
  const domain = arr.length === 1 ? arr[0] : `.${arr[arr.length - 2]}.${arr[arr.length - 1]}`
  const option: CookieSetOptions = {
    path: '/',
    maxAge: 2592000,
    domain,
    secure: false,
    httpOnly: false,
    sameSite: 'lax',
  }

  return option
}
