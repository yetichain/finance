import useCopyClipboard from 'hooks/useCopyClipboard'
import { IconButton } from 'ui'
import { ReactComponent as CopyIcon } from './assets/copy.svg'

export interface CopyProps {
  text: string
}

export default function Copy({ text }: CopyProps) {
  const [_, copy] = useCopyClipboard()
  return (
    <IconButton onClick={() => copy(text)}>
      <CopyIcon />
    </IconButton>
  )
}
