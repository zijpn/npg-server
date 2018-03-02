module.exports = {
  transform: {
    '^.+\\.ts$': './node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  testEnvironment: 'node'
}