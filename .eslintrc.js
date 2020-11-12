module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'google',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    // 'linebreak-style': [
    //   'error',
    //   'windows'
    // ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // let babel handle this
    'node/no-unsupported-features/es-syntax': 'off',
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'require-jsdoc': 'off',
    'new-cap': 'off',
  },
};
