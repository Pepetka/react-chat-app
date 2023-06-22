module.exports = {
	extends: [
		'semistandard',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:promise/recommended',
		'plugin:react-hooks/recommended',
		'plugin:i18next/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'react-hooks',
		'i18next',
		'prettier',
		'unused-imports',
	],
	ignorePatterns: ['dist/**/*', 'storybook-static/**/*'],
	rules: {
		'unused-imports/no-unused-imports': 'error',
		'prettier/prettier': 'error',
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				ignoreAttribute: [
					'direction',
					'theme',
					'size',
					'FlexTag',
					'name',
					'justify',
					'align',
					'textAlign',
					'titleAlign',
					'TitleTag',
					'img',
					'reducerKey',
					'target',
					'carouselWidth',
					'carouselHeight',
					'margin',
					'borderRadius',
					'paddingInline',
					'avatarSize',
					'textSize',
					'blockTitle',
					'padding',
					'wrap',
					'minHeight',
				],
				ignore: ['ICE'],
			},
		],
		'multiline-ternary': 'off',
		'prefer-template': 'error',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'promise/param-names': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'no-tabs': 'off',
		'space-before-function-paren': 'off',
		'comma-dangle': 'off',
		'import/no-unused-modules': [
			'error',
			{
				unusedExports: true,
			},
		],
		'import/order': [
			'error',
			{
				'newlines-between': 'never',
				pathGroups: [
					{
						pattern: '@/**',
						group: 'external',
						position: 'after',
					},
				],
				distinctGroup: false,
			},
		],
	},
	overrides: [
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
				'max-len': 'off',
			},
		},
	],
	globals: {
		__API__: true,
	},
};
