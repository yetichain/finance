import ConnectionLoad from 'alium-uikit/src/components/ConnectionLoad'
import React from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'

const ConnectionLoader = () => {
  const loadConnection = useStoreNetwork((state) => state.loadConnection)

  return <ConnectionLoad load={loadConnection} />
}

export default ConnectionLoader
