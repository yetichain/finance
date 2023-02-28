import { NotFound } from 'alium-uikit/src'
import { ROUTES } from 'routes'

const ErrorPage = () => {
  return <NotFound redirectURL={ROUTES.home} />
}

export default ErrorPage
export { getStaticProps } from 'utils/i18n'
