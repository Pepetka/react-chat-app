import {RouterDecorator} from "../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import {ThemeDecorator} from "../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	themes: {
		default: 'dark',
		list: [
			{ name: 'dark', class: 'dark_theme', color: 'black' },
			{ name: 'light', class: 'light_theme', color: 'white' }
		],
	},
};

export const decorators = [
	RouterDecorator,
	ThemeDecorator,
];
