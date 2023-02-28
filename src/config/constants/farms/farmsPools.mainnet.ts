import { ChainId } from '@alium-official/sdk'
import { BSC_ALM, BSC_CAKE, USDT, WBNB } from '../../../constants/index'
import { FarmConfig } from '../types'

export const farmsPoolsMainnet: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YET-BNB LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '',
      [ChainId.MAINNET]: '0x92f12720733C626E3bEa3A35A9Bd6151ED12ff92',
    },
    token: BSC_ALM,
    quoteToken: WBNB,
  },
  {
    pid: 1,
    lpSymbol: 'YET-USDT LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '',
      [ChainId.MAINNET]: '0xf1Cac46EFf9A6BE6A1183375631a9fF6d0c38176',
    },
    token: BSC_ALM,
    quoteToken: USDT,
  },
  {
    pid: 2,
    lpSymbol: 'YET-CAKE LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '',
      [ChainId.MAINNET]: '0x4AfCB08A78FEeF566C6A62bB9856A3971C5317c6',
    },
    token: BSC_ALM,
    quoteToken: BSC_CAKE,
  },
  {
    pid: 3,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '',
      [ChainId.MAINNET]: '0x32c804c3640650ED8013E7c4627db5a2a9AD190a',
    },
    token: BSC_CAKE,
    quoteToken: WBNB,
  },
  {
    pid: 4,
    lpSymbol: 'BNB-USDT LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '',
      [ChainId.MAINNET]: '0xB55d67AA2d57861c81487b29A578aE1CdF272795',
    },
    token: WBNB,
    quoteToken: USDT,
  },
]
