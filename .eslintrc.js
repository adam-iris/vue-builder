// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /* Adam's config */

    // Don't flag bracing of arrow function body
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': 0,

    // Allow calls to the console
    'no-console': 0,

    // Allow private properties
    'no-underscore-dangle': 0,

    // Allow helper functions to be defined below the main function
    'no-use-before-define': 0,

    // Allow if () { return; } else { }
    'no-else-return': 0,

    // Rule of thumb is: double-quotes for user-facing text, single-quotes for identifiers
    'quotes': 0,

    // allow python-style _ignored variables
		'no-unused-vars': [1, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
		'no-underscore-dangle': 0,

    // Allow empty blocks {}
    'no-empty': 0,

    'require-v-for-key': 0,
  }
}
