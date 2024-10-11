import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            'indent': ['error', 4],
            'curly': ['off'],
            'space-before-function-paren': 0,
            'object-curly-spacing': 0,
            'react/no-unescaped-entities': 0,
            'no-extra-boolean-cast': 'off',
            'comma-dangle': 'off',
            'no-unused-vars': 0,
            'no-undef': 'off',
            '@typescript-eslint/no-unused-vars': 0,
        },
    },
)
