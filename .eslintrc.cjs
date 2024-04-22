module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
    ],
    overrides: [],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.ts'],
            },
            alias: {
                map: [['src', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        'prettier/prettier': ['error'],
    },
    "plugins": [
        "@typescript-eslint",
        'prettier'
    ],
    rules: {
        'indent': 'off'
    }
}
