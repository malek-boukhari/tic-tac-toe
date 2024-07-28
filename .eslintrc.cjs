module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended'
  ],
  parser: '@typescript-eslint/parser',
  root: true,
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts"]
      }
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 4
      }
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true, allowSeparatedGroups: true, ignoreCase: true}],
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
          ['type'],
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    'no-undef': 2,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    eqeqeq: ['error', 'smart'],
    'no-caller': 2,
    'default-case': 2,
    'use-isnan': 2,
    'no-duplicate-imports': 0,
    'no-sequences': 'error',
    'eol-last': ['error', 'always'],
    curly: 'error',
    'no-empty-function': 'error',
    'max-lines': [
      'error',
      {
        max: 1000,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    complexity: ['error', 12],
    'max-lines-per-function': [
      'error',
      {
        max: 700
      }
    ],
    'max-params': ['error', 8],
    'consistent-return': 'error',
    'max-len': [
      'error',
      {
        code: 180,
        tabWidth: 4,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true
      }
    ],
    'prefer-const': 'error',
    'no-magic-numbers': [
      0,
      {
        ignore: [-1, 0, 1, 2]
      }
    ],
    'object-shorthand': 'error',
    'no-labels': [
      'error',
      {
        allowLoop: true,
        allowSwitch: true
      }
    ],
    'prefer-promise-reject-errors': [
      'error',
      {
        allowEmptyReject: true
      }
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ],
    'no-shadow': 'error',
    'no-self-compare': 'error',
    '@typescript-eslint/prefer-for-of': 2,
    '@typescript-eslint/explicit-function-return-type': [
      1,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true
      }
    ]
  }
};
