import { Meta, StoryFn } from '@storybook/react';
import { DeepPartial } from 'redux';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { LoginForm } from './LoginForm';

export default {
	title: 'features/AuthByUsername/LoginForm',
	component: LoginForm,
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm />;

const state: DeepPartial<StateSchema> = {
	authByUsername: {
		password: 'password',
		username: 'User',
	},
};

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
