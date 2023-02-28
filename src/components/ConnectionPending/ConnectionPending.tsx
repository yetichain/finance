import Portal from '@reach/portal'
import { ToastPending } from 'alium-uikit/src'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

const ConnectionPending = () => {
  const connectionError = useSelector<AppState, AppState['application']['connectionError']>(
    (state) => state.application.connectionError,
  )
  return <Portal>{connectionError && <ToastPending error={connectionError} />}</Portal>
}

export default ConnectionPending
