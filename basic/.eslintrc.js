module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/essential'
  ],
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': "module"
  },
  rules: {
    "extends": "plugin:vue/base"
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
};
