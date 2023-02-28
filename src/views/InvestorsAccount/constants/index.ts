import AliumCollectibleAbi from './abis/AliumCollectible.json'
import AliumTokenAbi from './abis/AliumToken.json'
import AliumVestingAbi from './abis/AliumVesting.json'
import NFTPrivateExchangerAbi from './abis/NFTPrivateExchanger.json'
import NFTPublicExchangerAbi from './abis/NFTPublicExchanger.json'

export const NFT_ALIUM_ARCHIVEMENT_COLLECTIBLE: any = process.env.APP_NFT_ALIUM_ARCHIVEMENT_COLLECTIBLE
export const NFT_ALIUM_COLLECTIBLE_NFT: any = process.env.APP_NFT_ALIUM_COLLECTIBLE_NFT
export const NFT_ALIUM_CHASHBOX: any = process.env.APP_NFT_ALIUM_CHASHBOX

export const NFT_EXCHANGER_PRIVATE: any = process.env.APP_NFT_EXCHANGER_PRIVATE
export const NFT_EXCHANGER_STRATEGICAL_PRIVATE: any = process.env.APP_NFT_EXCHANGER_STRATEGICAL_PRIVATE
export const NFT_EXCHANGER_PUBLIC: any = process.env.APP_NFT_EXCHANGER_PUBLIC

export const NFT_VESTING: any = process.env.APP_NFT_VESTING
export const NFT_VESTING_TOTAL_VIA_TRANSIVER: any = process.env.APP_NFT_VESTING_TOTAL_VIA_TRANSIVER

export { AliumVestingAbi, AliumCollectibleAbi, AliumTokenAbi, NFTPublicExchangerAbi, NFTPrivateExchangerAbi }
