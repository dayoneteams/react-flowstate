/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { diagnostics: false }],
  },
};
