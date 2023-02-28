import { Contract } from 'ethers'
import { useEffect, useState } from 'react'
import { logError } from 'utils/bridge/helpers'
import { getEthersProvider } from 'utils/bridge/providers'
import { useBridgeDirection } from './useBridgeDirection'
import { useWeb3Context } from './useWeb3Context'

export const useMediatorInfo = () => {
  const { homeChainId, homeMediatorAddress } = useBridgeDirection()
  const { account, connected } = useWeb3Context()
  const [currentDay, setCurrentDay] = useState()
  const [feeManagerAddress, setFeeManagerAddress] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (!connected) return
    const processMediatorData = async () => {
      setloading(true)
      if (!account || !homeChainId || !homeMediatorAddress || loading) return
      const ethersProvider = await getEthersProvider(homeChainId)
      if (!ethersProvider) return
      const abi = [
        'function getCurrentDay() view returns (uint256)',
        'function feeManager() public view returns (address)',
        'function getBridgeInterfacesVersion() external pure returns (uint64, uint64, uint64)',
      ]

      const mediatorContract = new Contract(homeMediatorAddress, abi, ethersProvider)

      const setFeeManager = () => {
        mediatorContract
          .feeManager()
          .then(setFeeManagerAddress)
          .catch((feeManagerAddressError) => logError({ feeManagerAddressError }))
      }

      mediatorContract
        .getBridgeInterfacesVersion()
        .then((versionArray) => {
          const version = versionArray.map((v) => v.toNumber()).join('.')
          if (version >= '2.1.0') {
            setFeeManager()
          } else {
            setFeeManagerAddress(homeMediatorAddress)
          }
        })
        .catch((bridgeVersionError) => logError({ bridgeVersionError }))

      mediatorContract
        .getCurrentDay()
        .then((day) => setCurrentDay(day))
        .catch((currentDayError) => logError({ currentDayError }))
    }
    processMediatorData()
  }, [account, connected, homeChainId, homeMediatorAddress, loading])

  return {
    currentDay,
    feeManagerAddress,
  }
}
