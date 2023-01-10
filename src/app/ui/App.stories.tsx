import { App } from './App';
import { Meta, StoryFn } from '@storybook/react';

export default {
	title: 'App',
	component: App,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta<typeof App>;

const Template: StoryFn<typeof App> = (args) => <App />;

export const Normal = Template.bind({});
