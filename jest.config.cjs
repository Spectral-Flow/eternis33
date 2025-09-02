module.exports = {
  projects: [
    {
      displayName: 'root-js',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/**/*.js'],
    },
    '<rootDir>/packages/sentinel-guard',
    '<rootDir>/packages/sfdp-sim',
  ],
};
