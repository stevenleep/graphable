/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/tests", "<rootDir>/coverage"],
  reporters: ["default", "jest-junit"],
};
