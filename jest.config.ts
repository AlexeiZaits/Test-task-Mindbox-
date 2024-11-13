import { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/src/**/*.mock**',
    '!<rootDir>/src/**/*.module.scss',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'scss',
  ],
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '^entities/(.*)$': '<rootDir>/src/entities/$1',
    '^features/(.*)$': '<rootDir>/src/features/$1',
    '^widjets/(.*)$': '<rootDir>/src/widjets/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
    '^.+\.svg$': 'jest-svg-transformer',
    '\.(css|scss)$': 'identity-obj-proxy', // Мок для CSS и SCSS
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@mui/material).+", // Указываем, какие модули не игнорировать
  ],
};

export default config;
