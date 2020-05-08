module.exports = {
  parser: 'babel-eslint',
  extends: [
    // ESSENTIALS
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    // OPTIONAL
  ],
  plugins: [
    'emotion',
    'jest',
  ],
  rules: {
    // ENABLE THIS SINCE: next.js does not require importing React at the top of the components everytime.
    // "react/react-in-jsx-scope": "off",
    "emotion/jsx-import": "off",
    "emotion/no-vanilla": "error",
    "emotion/import-from-emotion": "error",
    "emotion/styled-import": "error",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
}
