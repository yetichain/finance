/* eslint-disable @typescript-eslint/no-require-imports */

import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import env from './.env.production'

// @ts-ignore
process.env = {
  ...process.env,
  ...env,
}
