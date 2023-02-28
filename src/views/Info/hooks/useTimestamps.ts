import getUnixTime from 'date-fns/getUnixTime'
import subDays from 'date-fns/subDays'
import { useMemo } from 'react'

const now = new Date()

export default function useTimestamps() {
  return useMemo(() => {
    return {
      h24: getUnixTime(subDays(now, 1)),
      d7: getUnixTime(subDays(now, 7)),
    }
  }, [])
}
