module.exports = {
  transform: {
    '^.+\\.ts$': './node_modules/ts-jest/preprocessor.js'
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ]
}