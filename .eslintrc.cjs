module.exports = {
	extends: [
		'semistandard',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:promise/recommended',
		'plugin:react-hooks/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react-hooks'],
	rules: {
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
