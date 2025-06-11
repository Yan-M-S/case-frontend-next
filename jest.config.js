module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest', // Para processar JS e JSX
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Resolve o alias "@"
    '\\.css$': 'identity-obj-proxy',  // Mock de arquivos CSS
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],  // Configuração de ESModules
  transformIgnorePatterns: [
    "/node_modules/(?!your-esm-package-name|another-esm-package).+\\.js$",
  ],
}
