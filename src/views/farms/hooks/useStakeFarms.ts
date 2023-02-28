import { useMasterchef } from 'hooks/useContract'
import { useCallback } from 'react'
import { stakeFarm } from 'utils/farm/calls'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeFarm(masterChefContract, pid, amount)

      return txHash
    },
    [masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
