import { isProduction } from 'config'
import { GetStaticProps } from 'next'
import { getStaticProps as getI18nProps } from 'utils/i18n'

export { default } from 'views/Info'

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    ...(await getI18nProps(ctx)),
    notFound: isProduction as any,
  }
}
