import { useBlockQuery } from '../generated'

export default function useBlock(timestamp: number) {
  const { data } = useBlockQuery({
    variables: {
      timestamp,
    },
    context: {
      blocklytics: true,
    },
  })
  return Number(data?.blocks[0]?.number)
}
