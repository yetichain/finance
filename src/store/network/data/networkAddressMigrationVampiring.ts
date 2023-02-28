import { ChainId } from '@alium-official/sdk'

export const networkAddressMigrationVampiring: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: /********/ '0xe4E690ce68f531EcCe6D78f8339184032D6D0957',
  [ChainId.BSCTESTNET]: /*****/ '0x2d375598D831202E043220C84D5fFB78a252dfb2',
  [ChainId.HECOMAINNET]: /****/ '0x4D3D711853a4A25AE1D17347a97253A66Ed63D18',
  [ChainId.HECOTESTNET]: /****/ '',
  [ChainId.ETHER_MAINNET]: /**/ '0x8613ecdbd50efd649ee1d7837e78fb71ee405240',
  [ChainId.ETHER_TESTNET]: /**/ '',
  [ChainId.MATIC_MAINNET]: /**/ '0x54a472C96b01f8639326D49Ef3eD4B9a78C3ba63',
  [ChainId.MATIC_TESTNET]: /**/ '',
}
