module.exports = {
	extends: [
		'semistandard',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:promise/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'promise/param-names': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		'space-before-function-paren': 'off',
		'comma-dangle': 'off',
	},
};
