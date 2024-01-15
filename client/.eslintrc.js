module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    'react-app',
    'react-app/jest',
    'plugin:@typescript-eslint/recommended'
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "ignorePatterns": [".eslintrc.js"],
  "plugins": [
    "react",
    "@stylistic/eslint-plugin",
    '@stylistic/ts',
  ],
  "rules": {
    "@typescript-eslint/no-empty-interface": [0],
    '@stylistic/ts/indent': ['error', 2],
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        "name": "react-redux",
        "importNames": ["useAppDispatch", "useAppSelector"],
        "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
      }
    ],
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "warn",
  }
};
