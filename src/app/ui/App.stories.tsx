import { Meta, StoryFn } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { DeepPartial } from 'redux';
import { App } from './App';

export default {
	title: 'App',
	component: App,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta<typeof App>;

const Template: StoryFn<typeof App> = (args) => <App />;

const initialState: DeepPartial<StateSchema> = {
	user: {
		_inited: true,
		authData: {
			avatar: '',
			id: 'id',
			username: 'User',
		},
	},
};

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(initialState as StateSchema)];
