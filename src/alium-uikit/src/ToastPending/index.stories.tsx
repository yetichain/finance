import { useState } from 'react'
import { ErrorConnect } from '../../widgets/Toast'
import { Button } from '../Button'
import ToastPending from './ToastPending'

export default {
  title: 'components/ToastPending',
  component: ToastPending,
  argTypes: {},
}

export const Default: FC = () => {
  const [error, seterror] = useState<ErrorConnect>(null)
  const toastError: ErrorConnect = {
    code: '-32002',
    name: 'test',
    message: 'test',
  }
  return (
    <div>
      <Button
        onClick={() => {
          seterror(toastError)
        }}
      >
        Make error connection
      </Button>
      <Button
        onClick={() => {
          seterror(null)
        }}
      >
        Clear
      </Button>
      {error && <ToastPending error={error} />}
    </div>
  )
}
