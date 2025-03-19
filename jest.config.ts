import {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setupFilesAfterEnv.ts'],
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/jest.mock.js',
  },
};

export default config;
