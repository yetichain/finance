import { useMasterchef } from 'hooks/useContract'
import { useEffect } from 'react'
import { useStoreFarms } from 'store/farms/useStoreFarms'

export default function useBlockReward() {
  const masterChefContract = useMasterchef()
  const fetchBlockReward = useStoreFarms((state) => state.fetchBlockReward)
  useEffect(() => {
    fetchBlockReward(masterChefContract)
  }, [fetchBlockReward, masterChefContract])
  return useStoreFarms((state) => state.blockReward)
}
