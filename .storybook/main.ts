import { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';
import { mergeConfig } from 'vite';
const config: StorybookConfig = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	staticDirs: ['../public'],
	features: {
		storyStoreV7: true,
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [
				svgr({
					exportAsDefault: true,
				}),
			],
			define: {
				__API__: 'https://api/',
				__API_SOCKET__: 'wss://api/',
				__MOCK_SOCKET__: true,
			},
		});
	},
	docs: {
		autodocs: false,
	},
};
export default config;
