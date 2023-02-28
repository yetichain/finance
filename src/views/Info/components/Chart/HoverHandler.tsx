import { useEffect } from 'react'
import { ChartEntry } from 'views/Info/types'

export interface HoverHandlerProps {
  data: ChartEntry[]
  payload: ChartEntry
  onHover?: (index: number | undefined) => any
}

export default function HoverHandler({ data, onHover, payload }: HoverHandlerProps) {
  useEffect(() => {
    onHover?.(data.indexOf(payload))
  }, [data, onHover, payload])
  return null
}
