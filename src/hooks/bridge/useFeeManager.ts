import { Contract } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useEffect, useState } from 'react'
import { logError } from 'utils/bridge/helpers'
import { getEthersProvider } from 'utils/bridge/providers'
import { useBridgeDirection } from './useBridgeDirection'
import { useMediatorInfo } from './useMediatorInfo'
import { useWeb3Context } from './useWeb3Context'

export const useFeeManager = () => {
  const { connected } = useWeb3Context()
  const { homeChainId } = useBridgeDirection()
  const { account } = useActiveWeb3React()
  const { feeManagerAddress } = useMediatorInfo()
  const [isRewardAddress, setRewardAddress] = useState(false)
  const [homeToForeignFeeType, setHomeToForeignFeeType] = useState(
    '0x741ede137d0537e88e0ea0ff25b1f22d837903dbbee8980b4a06e8523247ee26',
  )
  const [foreignToHomeFeeType, setForeignToHomeFeeType] = useState(
    '0x03be2b2875cb41e0e77355e802a16769bb8dfcf825061cde185c73bf94f12625',
  )

  useEffect(() => {
    if (!feeManagerAddress || !connected) return
    const calculateFees = async () => {
      const ethersProvider = await getEthersProvider(homeChainId)
      const abi = [
        'function FOREIGN_TO_HOME_FEE() view returns (bytes32)',
        'function HOME_TO_FOREIGN_FEE() view returns (bytes32)',
      ]
      const feeManagerContract = new Contract(feeManagerAddress, abi, ethersProvider)

      feeManagerContract
        .FOREIGN_TO_HOME_FEE()
        .then((feeType) => setForeignToHomeFeeType(feeType))
        .catch((feeTypeError) => logError({ feeTypeError }))

      feeManagerContract
        .HOME_TO_FOREIGN_FEE()
        .then((feeType) => setHomeToForeignFeeType(feeType))
        .catch((feeTypeError) => logError({ feeTypeError }))
    }

    calculateFees()
  }, [feeManagerAddress, homeChainId, connected])

  useEffect(() => {
    if (!account || !connected) return
    if (!feeManagerAddress) return
    const checkRewardAddress = async () => {
      const ethersProvider = await getEthersProvider(homeChainId)
      const abi = ['function isRewardAddress(address) view returns (bool)']
      const feeManagerContract = new Contract(feeManagerAddress, abi, ethersProvider)
      feeManagerContract
        .isRewardAddress(account)
        .then((is) => setRewardAddress(is))
        .catch((rewardAddressError) => logError({ rewardAddressError }))
    }
    checkRewardAddress()
  }, [account, feeManagerAddress, homeChainId, connected])

  return {
    isRewardAddress,
    homeToForeignFeeType,
    foreignToHomeFeeType,
  }
}
