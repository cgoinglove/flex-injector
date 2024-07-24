module.exports = {
  extends: ['eslint:recommended'],
  plugins: ['only-warn'],
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.js', 'vitest.config.ts'],
  parserOptions: {
    project: true,
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['*.entity.ts', '*.repository.ts', '*.service.ts'],
    },
  ],
};
