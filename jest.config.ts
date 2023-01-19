export default {
	clearMocks: true,
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
	moduleDirectories: ['node_modules', 'src'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
	modulePaths: ['<rootDir>src'],
	rootDir: './',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.s?css$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|png|jpeg)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.svg$': '<rootDir>/test/__mocks__/jestEmptyComponent.tsx',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				publicPath: '<rootDir>/html-report',
				filename: 'report.html',
				openReport: false,
				inlineSource: true,
			},
		],
	],
};
