module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    indent: ['warn', 4],
    semi: ['warn']
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2015,
    sourceType: 'module'
  }
};
