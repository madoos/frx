export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./src/internal/testing/matchers.ts'],
};
