import { useMasterchef } from 'hooks/useContract'
import { useCallback } from 'react'
import { harvestFarm } from 'utils/farm/calls'

const useHarvestFarm = (farmPid: number) => {
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    await harvestFarm(masterChefContract, farmPid)
  }, [farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
