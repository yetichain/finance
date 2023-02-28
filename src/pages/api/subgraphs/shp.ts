import { createProxyMiddleware } from 'http-proxy-middleware'
import { PageConfig } from 'next'

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default createProxyMiddleware({
  target: 'http://65.21.154.6:8000/subgraphs/name/shp',
  changeOrigin: true,
  ignorePath: true,
})
