import { initialize, mswDecorator } from 'msw-storybook-addon';
import { ThemeDecorator } from '../src/shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { LocalesDecorator } from '../src/shared/config/storybook/decorators/LocalesDecorator/LocalesDecorator';
import { StoreDecorator } from '../src/shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { RouterDecorator } from '../src/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { Theme } from '../src/shared/const/theme';

initialize({ onUnhandledRequest: 'bypass' });

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
