import { useMasterchef } from 'hooks/useContract'
import { useCallback } from 'react'
import { unstakeFarm } from './../../../utils/farm/calls/index'

const useUnstakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarm(masterChefContract, pid, amount)
    },
    [masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
