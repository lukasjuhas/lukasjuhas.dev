module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    'window': true,
    'document': true,
    'axios': true,
    'FormData': true,
    'Form': true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'event', // for e.returnvalue
        'response', // for Express responses
      ]
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
