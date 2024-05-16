export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  setupFilesAfterEnv: [],
};
