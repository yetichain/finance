import { useBridgeContext } from 'contexts/BridgeContext'
import { utils } from 'ethers'
import React from 'react'
import BridgeNetwork from '../BridgeNetwork'

export const ToToken = React.memo(() => {
  const { toToken: token, toAmount: amount, toAmountLoading: loading, balancesLoading } = useBridgeContext()

  return (
    <div>
      <BridgeNetwork
        type='toNetwork'
        value={token ? utils.formatUnits(amount, token?.decimals) : '0'}
        token={token}
        balanceLoading={balancesLoading || loading}
      />
    </div>
  )
})
