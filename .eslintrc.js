module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es6: true,
  },
  globals: {
    document: true,
  },
  extends: ['airbnb', 'react-app', 'plugin:prettier/recommended'],
  plugins: ['react', 'jest'],
  rules: {
    'no-console': [0],
    'react/jsx-filename-extension': [0],
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/label-has-for': [0],
    'react/jsx-one-expression-per-line': [0],
  },
};
