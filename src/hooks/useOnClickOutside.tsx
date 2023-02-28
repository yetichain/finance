import { RefObject, useEffect, useRef } from 'react'

export function useOnClickOutside<T extends HTMLElement>(
  node: RefObject<T | undefined>,
  handler: undefined | (() => void),
  allowClickIds?: string[],
) {
  const handlerRef = useRef<undefined | (() => void)>(handler)
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current?.contains(e.target as Node) ?? false) {
        return
      }
      if (allowClickIds?.length && allowClickIds?.includes((e.target as any)?.id)) {
        return
      }
      if (handlerRef.current) handlerRef.current()
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [node])
}

export default useOnClickOutside
