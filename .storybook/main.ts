import { StorybookConfig } from '@storybook/builder-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-addon-themes',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	features: {
		storyStoreV7: true,
	},
	docs: {
		autodocs: true,
	},
	async viteFinal(config) {
		config.plugins = [
			...config.plugins!,
			svgr({
				exportAsDefault: true,
			}),
		];

		// return the customized config
		return config;
	},
};

export default config;