export const defaultTokenIcons = {
  ALM: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11/logo.png',
  CAKE: 'images/coins/CAKE.png',
}

export const getTokenLogoURL = (address: string, symbol?: string) => {
  if (defaultTokenIcons[symbol]) {
    return defaultTokenIcons[symbol]
  }
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${address}/logo.png`
}
