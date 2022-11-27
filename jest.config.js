/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  setupFiles: ['<rootDir>/test/setup-tests.ts'],

  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
