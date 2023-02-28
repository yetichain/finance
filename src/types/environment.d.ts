declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: string
      APP_NODES_BSC: string[]
      APP_NODES_HECO: string[]
      APP_NODES_ETHEREUM: string[]
      APP_NODES_MATIC: string[]
      APP_NFT_PUBLIC_SELLER_ADDRESS: string
      APP_NFT_COLLECTIBLE_ADDRESS: string
      APP_NFT_ALIUM_ARCHIVEMENT_COLLECTIBLE: string
      APP_NFT_ALIUM_COLLECTIBLE_NFT: string
      APP_NFT_ALIUM_CHASHBOX: string
      APP_NFT_ALIUM_TOKEN: string
      APP_NFT_EXCHANGER_PRIVATE: string
      APP_NFT_EXCHANGER_STRATEGICAL_PRIVATE: string
      APP_NFT_EXCHANGER_PUBLIC: string
      APP_NFT_VESTING: string
      APP_NFT_VESTING_TOTAL_VIA_TRANSIVER: string
      APP_INTERCOM_APP_ID: string | null
      APP_BSCSCAN_API_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
