import { ChainId } from '@alium-official/sdk'
import { TEST_BSC_ALM, TEST_BSC_ETH_Migration, TEST_BSC_USDT_Migration } from '../../../constants/index'
import { FarmConfig } from '../types'
import { TEST_BSC_WBNB } from './../../../constants/index'

export const farmsPoolsTestnet: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ALM-BNB LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '0xdcf05c93b4940192cc244c92330566b1211a028d',
      [ChainId.MAINNET]: '',
    },
    token: TEST_BSC_ALM,
    quoteToken: TEST_BSC_WBNB,
  },
  {
    pid: 1,
    lpSymbol: 'USDT-ETH LP',
    lpAddresses: {
      [ChainId.BSCTESTNET]: '0xdC9747Fda30F57E6665345358342bB12316F0F27',
      [ChainId.MAINNET]: '',
    },
    token: TEST_BSC_USDT_Migration,
    quoteToken: TEST_BSC_ETH_Migration,
  },
]
const mocked = farmsPoolsTestnet.map((mock) => ({
  ...mock,
  pid: 2,
  lpSymbol: 'MOCKED TEST' + mock.lpSymbol,
}))
