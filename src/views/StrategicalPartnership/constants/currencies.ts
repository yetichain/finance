import { storeNetwork } from 'store/network/useStoreNetwork'

const currencies = {
  '97': {
    stablecoins: ['USDT', 'BUSD', 'USDC'],
    tokens: [
      {
        name: 'BUSD',
        symbol: 'BUSD',
        address: '0x1d566540F39fd80Cb2680461C8cF10bCCc2A6fa1',
        chainId: 97,
        decimals: 18,
      },
      {
        name: 'USDT',
        symbol: 'USDT',
        address: '0x76130226b1411Ca5511Ff3e58ea81Ec8Bb234C7A',
        chainId: 97,
        decimals: 18,
      },
      {
        name: 'USDC',
        symbol: 'USDC',
        address: '0x4a291477C8901672BCa0E4d2bF391587276A4a37',
        chainId: 97,
        decimals: 18,
      },
    ],
    match: {
      BUSD: {
        name: 'BUSD',
        symbol: 'BUSD',
        address: '0x1d566540F39fd80Cb2680461C8cF10bCCc2A6fa1',
        chainId: 97,
        decimals: 18,
      },
      USDT: {
        name: 'USDT',
        symbol: 'USDT',
        address: '0x76130226b1411Ca5511Ff3e58ea81Ec8Bb234C7A',
        chainId: 97,
        decimals: 18,
      },
      USDC: {
        name: 'USDC',
        symbol: 'USDC',
        address: '0x4a291477C8901672BCa0E4d2bF391587276A4a37',
        chainId: 97,
        decimals: 18,
      },
    },
  },
  '56': {
    stablecoins: ['USDT', 'BUSD', 'USDC'],
    tokens: [
      {
        name: 'BUSD',
        symbol: 'BUSD',
        address: '0x3e919A1284A374260D99276672D354fDe2a09Cc0',
        chainId: 56,
        decimals: 18,
      },
      {
        name: 'USDT',
        symbol: 'USDT',
        address: '0x1138eBb3101f557b28326a28B6f192c7feCC95f7',
        chainId: 56,
        decimals: 18,
      },
      {
        name: 'USDC',
        symbol: 'USDC',
        address: '0x1EFD0202AA013F7387F06ab2F215860E94754CcD',
        chainId: 56,
        decimals: 18,
      },
    ],
    match: {
      BUSD: {
        name: 'BUSD',
        symbol: 'BUSD',
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        chainId: 56,
        decimals: 18,
      },
      USDT: {
        name: 'USDT',
        symbol: 'USDT',
        address: '0x55d398326f99059ff775485246999027b3197955',
        chainId: 56,
        decimals: 18,
      },
      USDC: {
        name: 'USDC',
        symbol: 'USDC',
        address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        chainId: 56,
        decimals: 18,
      },
    },
  },
}

export const getCurrencies = () => {
  const { currentChainId } = storeNetwork.getState()
  return currencies[currentChainId]
}
