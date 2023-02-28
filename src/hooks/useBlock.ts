import { BlockContext } from 'contexts/BlockContext'
import { useContext } from 'react'

const useBlock = () => {
  const block: number = useContext(BlockContext)
  return block
}

export default useBlock
