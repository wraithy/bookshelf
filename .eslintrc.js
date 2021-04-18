module.exports = {
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'max-len': ['warn', { code: 120 }],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always']
  },
  overrides: [{ files: ['**/*.ts'] }]
}
