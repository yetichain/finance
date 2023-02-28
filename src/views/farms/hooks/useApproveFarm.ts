import { Contract, ethers } from 'ethers'
import { useMasterchef } from 'hooks/useContract'
import { useCallback } from 'react'
import { useCallWithGasPrice } from 'utils/useCallWithGasPrice'

const useApproveFarm = (lpContract: Contract) => {
  const masterChefContract = useMasterchef()

  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(lpContract, 'approve', [
        masterChefContract.address,
        ethers.constants.MaxUint256,
      ])
      const receipt = await tx.wait()
      console.log('APPROVE FARM : ', receipt)

      return receipt.status
    } catch (e) {
      console.error('APPROVE FARM : ', e)
      return false
    }
  }, [lpContract, masterChefContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveFarm
