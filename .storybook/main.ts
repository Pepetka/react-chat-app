import { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

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
		config.define = {
			__API__: JSON.stringify('https://api/'),
			__API_SOCKET__: JSON.stringify('wss://api/'),
			__MOCK_SOCKET__: true,
		};
		config.plugins = await withoutVitePlugins(config.plugins, [
			'vite-plugin-pwa',
			'vite-plugin-pwa:info',
			'vite-plugin-pwa:build',
			'vite-plugin-pwa:dev-sw',
		]);

		return config;
	},
	docs: {
		autodocs: false,
	},
};
export default config;
