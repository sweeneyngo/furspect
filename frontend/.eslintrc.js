// basic .eslintrc.js compatible with react prettier and typescript
module.exports = {
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: ['react', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
