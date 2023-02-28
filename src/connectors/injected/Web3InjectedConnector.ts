import { ChainId } from '@alium-official/sdk'
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/member-ordering */
import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { getNetworkProviderParams } from 'store/network/lib/getNetworkProviderParams'
import { WindowChain } from 'types'

export class Web3InjectedConnector extends InjectedConnector {
  private chainId: number
  // list for force notify like Ethereum
  private listForcedNotifyConnect: AbstractConnectorArguments['supportedChainIds']

  constructor({ supportedChainIds }: AbstractConnectorArguments, chainId: number) {
    super({ supportedChainIds: supportedChainIds })
    this.chainId = chainId || supportedChainIds[0]
    this.listForcedNotifyConnect = [ChainId.ETHER_MAINNET, ChainId.ETHER_TESTNET]
  }

  // when auto notify not working, use this method
  public async notifyMetamask() {
    const ethereum = window.ethereum
    try {
      if (this.inForced) {
        // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${this.chainId.toString(16)}` }],
        })
      }
    } catch (switchError) {
      if (switchError.code === 32002) {
        // await ethereum.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [{ chainId: '0xf00', rpcUrl: 'https://...' /* ... */ }],
        return console.log(switchError)
      }
    }
  }

  public async addNetworkInWallet() {
    const newNetworkProviderParams = getNetworkProviderParams(this.chainId)
    await (window as WindowChain).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [newNetworkProviderParams],
    })
  }

  public async activate(): Promise<ConnectorUpdate> {
    try {
      if (window.ethereum?.isMetaMask) {
        await this.notifyMetamask()
        await this.addNetworkInWallet().catch(console.error)
      }

      return super.activate()
    } catch (error) {
      return error
    }
  }

  get inForced() {
    return this.listForcedNotifyConnect.includes(this.chainId)
  }
}
