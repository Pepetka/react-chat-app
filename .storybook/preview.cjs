import {RouterDecorator} from "../src/shared/config/storybook/RouterDecorator/RouterDecorator";

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	RouterDecorator,
];
