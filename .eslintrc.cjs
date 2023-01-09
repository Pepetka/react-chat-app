module.exports = {
	extends: [
		'semistandard',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		'space-before-function-paren': 'off',
		'comma-dangle': 'off',
	},
};
