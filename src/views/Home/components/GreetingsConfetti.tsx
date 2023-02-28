import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use/lib'

export default () => {
  const { width, height } = useWindowSize()

  let localStoragValue = false
  if (localStorage.getItem('confetti-inited')) {
    localStoragValue = !!Number(localStorage.getItem('confetti-inited'))
  }

  const [inited] = useState(localStoragValue)

  useEffect(() => {
    localStorage.setItem('confetti-inited', '1')
  }, [])

  if (inited) {
    return null
  }

  return (
    <Confetti
      width={width}
      height={height}
      style={{ position: 'absolute', left: -50, top: -50, height: 'calc(100vh - 60px)', width: 'inherit' }}
    />
  )
}
