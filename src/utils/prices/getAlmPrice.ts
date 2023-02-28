import Cookies from 'universal-cookie'

const cookies = new Cookies()
export const getAlmPrice = () => {
  const cookieAlmPrice: string = cookies.get('alm-price')
  return cookieAlmPrice || '0'
}
