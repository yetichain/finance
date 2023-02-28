import { ChainId } from '@alium-official/sdk'
import random from 'lodash/random'
import { networkAddressFactory } from 'store/network/data/networkAddressFactory'
import { networkAddressMigrationVampiring } from 'store/network/data/networkAddressMigrationVampiring'
import { networkAddressRouter } from 'store/network/data/networkAddressRouter'
import { networkProvidersParamsList } from 'store/network/data/networkProvidersParamsList'
import { networkRpcUrlsList } from 'store/network/data/networkRpcUrlsList'
import {
  INetworkTokensLPMigrationVampiringItem,
  networkTokensLPMigrationVampiring,
} from 'store/network/data/networkTokensLPMigrationVampiring'
import { AddEthereumChainParameter } from 'types/AddEthereumChainParameter'

export interface ICurrentNetwork {
  id: number
  rpcUrl: string
  providerParams: AddEthereumChainParameter
  address: {
    factory: string
    vampiring: string
    router: string
  }
  tokens: {
    lpMigrationVampiring: INetworkTokensLPMigrationVampiringItem[]
  }
}

export const getCurrentNetwork = (currentChainId: number): ICurrentNetwork => {
  const id: ChainId = currentChainId in ChainId ? currentChainId : ChainId.MAINNET

  return {
    id,
    rpcUrl: networkRpcUrlsList[id][random(0, networkRpcUrlsList[id].length - 1)],
    providerParams: networkProvidersParamsList[id],
    address: {
      factory: networkAddressFactory[id],
      vampiring: networkAddressMigrationVampiring[id],
      router: networkAddressRouter[id],
    },
    tokens: {
      lpMigrationVampiring: networkTokensLPMigrationVampiring[id],
    },
  }
}
