import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from '@vue/eslint-config-prettier'

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: [
      'vite.config.ts',
      'eslint.config.js',
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      'vite.config.ts',
      '*.min.js',
      '*.bundle.js',
      '*.tmp',
      '*.temp',
      '*.log',
      '.env*',
      '.vscode/**',
      '.idea/**',
      '.DS_Store',
      'Thumbs.db',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml'
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Promise: 'readonly',
        defineEmits: 'readonly',
        defineProps: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'warn',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn'
    }
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue: vuePlugin
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: 'module'
      }
    },
    rules: {
      ...vuePlugin.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1
        }
      ]
    }
  }
]
