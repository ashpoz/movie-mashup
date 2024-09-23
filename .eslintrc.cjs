/* eslint-env node */

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
