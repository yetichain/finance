import { Toast, ToastContainer } from 'alium-uikit/src'
import useToast from 'hooks/useToast'
import { useSelector } from 'react-redux'

const ToastListener = () => {
  const toasts: Toast[] = useSelector((state: any) => state?.toasts?.data) || []
  const { remove } = useToast()

  const handleRemove = (id: string) => remove(id)

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener
