import { SWRConfiguration } from 'swr'

const config: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
}

export default config
