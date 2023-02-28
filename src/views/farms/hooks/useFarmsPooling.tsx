import { useEffect } from 'react'
import { fetchFarmUserDataAsync } from 'store/farms'
import { storeFarms } from 'store/farms/useStoreFarms'
import useSWR from 'swr'

// User farms data pooling
export const useFarmsPooling = (account?: string) => {
  const setFarmsUserData = storeFarms.getState().setFarmsUserData
  const toggleSlowUpdate = storeFarms.getState().toggleSlowUpdate
  const clearFarms = storeFarms.getState().clearFarms
  useEffect(() => {
    clearFarms()
  }, [account])

  useSWR(
    account ? ['farms/pooling', account] : null,
    async () => {
      toggleSlowUpdate(true)
      const fetchedFarms = await fetchFarmUserDataAsync(account)
      setFarmsUserData(fetchedFarms)
      toggleSlowUpdate(false)
    },
    { refreshInterval: 6000 },
  )
}
