module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "settings": {
        "react": {
            "version": "detect" // React version. "detect" automatically picks the version you have installed.
        }    
    },
    "plugins": [
        "react",
        "react-hooks"
    ],
    "rules": {
        "camelcase": 0,
        "arrow-parens": [2, "as-needed"],
        "no-param-reassign": [2, { props: false }],
        "import/prefer-default-export": 0,
        "react/prop-types": 0,
        "react/no-array-index-key": 0,
        "react/destructuring-assignment": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-a11y/anchor-is-valid": 0
    }
};