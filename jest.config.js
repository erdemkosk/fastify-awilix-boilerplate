const coverageDirectories = [
  'server/services',
];

export default {
  transform: {},
  collectCoverage: true,
  collectCoverageFrom: [`src/{${coverageDirectories.join(',')}}/**/*.{js,jsx,ts,tsx}`],
  coverageDirectory: './coverage/',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,

};
