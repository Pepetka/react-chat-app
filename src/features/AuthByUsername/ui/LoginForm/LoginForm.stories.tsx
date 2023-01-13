import { Meta, StoryFn } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { DeepPartial } from 'redux';

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
