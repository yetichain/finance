import { RefreshContext } from 'contexts/RefreshContext'
import { useContext } from 'react'

const useRefresh = () => {
  const { fast, slow } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow }
}

export default useRefresh
