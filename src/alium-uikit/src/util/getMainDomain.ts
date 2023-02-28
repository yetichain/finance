export const getMainDomain = (): string => {
  const host = process.browser && typeof window !== 'undefined' ? window.location.host : 'alium.finance'
  const arr = host.split('.')
  return arr.length === 1 ? arr[0] : `${arr[arr.length - 2]}.${arr[arr.length - 1]}`
}
