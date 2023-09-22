module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "prettier"],
    plugins: ["prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        // "indent": ["error", 4],
        "no-unused-vars": "warn",
        // "quotes": ["error", "double"],
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
    },
}
