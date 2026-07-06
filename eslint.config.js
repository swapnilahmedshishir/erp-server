import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.jest(),
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
);
