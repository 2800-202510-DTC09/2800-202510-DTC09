import {configs} from '@silver886/eslint-config';
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
        'no-console': ['error', {allow: ['error']}],
        'import-x/extensions': ['error', 'ignorePackages'],
        'import-x/no-nodejs-modules': ['off'],
        'import-x/no-useless-path-segments': ['off'],
        'prettierPlugin/prettier': ['error'],
    },
});
