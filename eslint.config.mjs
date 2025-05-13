import {configs} from '@silver886/eslint-config';
// eslint-disable-next-line import-x/no-unresolved
import {defineConfig, globalIgnores} from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig({
    extends: [
        configs.javascript,
        prettierConfig,
        globalIgnores(['**/node_modules', '/.pnpm-store']),
    ],
    languageOptions: {
        globals: globals.node,
    },
    plugins: {
        prettierPlugin,
    },
    rules: {
        'prettierPlugin/prettier': ['error'],
    },
});
