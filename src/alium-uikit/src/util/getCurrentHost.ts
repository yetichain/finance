const getCurrentHost = (): string => {
  return process.browser && typeof window !== 'undefined' ? window.location.host : 'alium.finance'
}

export default getCurrentHost
