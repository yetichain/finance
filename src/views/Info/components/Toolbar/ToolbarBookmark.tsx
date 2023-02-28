import { ReactComponent as BookmarkIcon } from './assets/bookmark.svg'
import ToolbarAction from './ToolbarAction'

export default function ToolbarBookmark() {
  return (
    <ToolbarAction>
      <BookmarkIcon />
    </ToolbarAction>
  )
}
