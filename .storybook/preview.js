import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeDecorator } from '../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LocalesDecorator } from '../src/shared/config/storybook/LocalesDecorator/LocalesDecorator';
import { StoreDecorator } from '../src/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '../src/shared/const/theme';

initialize();

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const globalTypes = {
	globalTheme: {
		name: 'Theme',
		description: 'Global theme for components',
		defaultValue: Theme.LIGHT,
		toolbar: {
			items: [
				{ value: Theme.DARK, title: 'Dark theme', icon: 'circle' },
				{ value: Theme.LIGHT, title: 'Light theme', icon: 'circlehollow' },
			],
			showName: true,
		},
	},
};

export const decorators = [
	StoreDecorator(),
	ThemeDecorator,
	LocalesDecorator,
	mswDecorator,
];
