module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es6: true,
  },
  globals: {
    'document': true
  },
  extends: [
    "airbnb",
    "react-app",
  ],
  plugins: ["react", "jest"],
  rules: {
    "no-console": [0],
    "react/jsx-filename-extension": [0],
    "jsx-a11y/href-no-hash": [0], 
  }
};