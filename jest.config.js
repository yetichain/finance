module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src', 'public'],
  moduleNameMapper: {
    'next/router': 'next-router-mock',
    '^.+\\.css$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!@alium-official/sdk).+\\.js$'],
}
