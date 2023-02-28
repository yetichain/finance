import React from 'react'
import { getBridgeLayout } from './BridgeLayout'
import BridgeCard from './components/BridgeCard'

export default function Bridge() {
  return <BridgeCard />
}

Bridge.getLayout = getBridgeLayout
