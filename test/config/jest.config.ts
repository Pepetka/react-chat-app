import { Config } from 'jest';

export default {
	clearMocks: true,
	testEnvironment: 'jsdom',
	coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
	moduleDirectories: ['node_modules', 'src'],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
	modulePaths: ['<rootDir>src'],
	rootDir: '../../',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.s?css$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|png|jpeg|jpg)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.svg$': '<rootDir>/test/__mocks__/jestEmptyComponent.tsx',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	globals: {
		__API__: 'https://api/',
		__API_SOCKET__: 'wss://api/',
		__MOCK_SOCKET__: true,
	},
	setupFilesAfterEnv: [
		'<rootDir>/test/config/jest.setup.ts',
		'<rootDir>/test/config/jest.env.ts',
	],
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				publicPath: '<rootDir>/reports',
				filename: 'index.html',
				openReport: false,
				inlineSource: true,
			},
		],
	],
	automock: false,
} as Config;
