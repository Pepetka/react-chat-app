module.exports = {
	extends: [
		'semistandard',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:promise/recommended',
		'plugin:react-hooks/recommended',
		'plugin:i18next/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks', 'i18next'],
	rules: {
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
		indent: ['error', 'tab'],
		'space-before-function-paren': 'off',
		'comma-dangle': 'off',
	},
};
