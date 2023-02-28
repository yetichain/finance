import { Pair } from '@alium-official/sdk'
import { usePairAdder } from 'state/user/hooks'

// for display in liqudity list after add
export const useFindLiqudityAfterAdd = (pair: Pair) => {
  const addPair = usePairAdder()
  const findPairAfterAdd = () => {
    if (pair) {
      console.info('ADDED:PAIR', pair)
      addPair(pair)
    } else {
      console.error('CANT ADD PAIR!')
    }
  }
  return findPairAfterAdd
}
