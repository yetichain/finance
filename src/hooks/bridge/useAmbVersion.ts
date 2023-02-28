import { useEffect, useState } from 'react'
import { fetchAmbVersion } from 'utils/bridge/amb'
import { getNetworkLabel, logError } from 'utils/bridge/helpers'
import { getEthersProvider } from 'utils/bridge/providers'

export const useAmbVersion = (foreignChainId: number, foreignAmbAddress: string) => {
  const [foreignAmbVersion, setForeignAmbVersion] = useState('')
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const label = getNetworkLabel(foreignChainId).toUpperCase()
    const key = `${label}-AMB-VERSION`
    const fetchVersion = async () => {
      const provider = await getEthersProvider(foreignChainId)
      await fetchAmbVersion(foreignAmbAddress, provider)
        .then((versionString) => {
          setForeignAmbVersion(versionString)
          sessionStorage.setItem(key, versionString)
        })
        .catch((versionError) => logError({ versionError }))
      setFetching(false)
    }
    const version = sessionStorage.getItem(key)
    if (!version && !fetching) {
      setFetching(true)
      fetchVersion()
    } else {
      setForeignAmbVersion(version)
    }
  }, [])

  return foreignAmbVersion
}
