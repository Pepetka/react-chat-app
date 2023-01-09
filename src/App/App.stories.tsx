import App from './App';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
	title: 'App',
	component: App,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const Normal = Template.bind({});
