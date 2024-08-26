import js from '@eslint/js';

export default [
  js.configs.recommended,

  {
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: false,
        },
      ],

      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'react/no-unknown-property': 0,
      'no-console': 0,
      'no-undef': 0,
      'no-plusplus': 0,
    },
  },
];
