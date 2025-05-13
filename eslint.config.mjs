import {configs} from '@silver886/eslint-config';
import {defineConfig, globalIgnores} from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

const DEFAULT_CONFIG = {
    extends: [
        configs.javascript,
        prettierConfig,
        globalIgnores(['**/node_modules', '/.pnpm-store']),
    ],
    plugins: {
        prettierPlugin,
    },
};

export default defineConfig([
    {
        ...DEFAULT_CONFIG,
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            'no-console': ['error', {allow: ['error']}],
            'import-x/extensions': ['error', 'ignorePackages'],
            'import-x/no-nodejs-modules': ['off'],
            'import-x/no-useless-path-segments': ['off'],
            'prettierPlugin/prettier': ['error'],
        },
    },
    {
        ...DEFAULT_CONFIG,
        files: ['**/public/**'],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'import-x/unambiguous': ['off'],
            'prettierPlugin/prettier': ['error'],
        },
    },
]);
