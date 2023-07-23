import { Meta, StoryFn } from '@storybook/react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import {
	StoreDecorator,
	RouterDecorator,
} from '@/shared/config/storybook/decorators';
import { StateSchema } from '@/app/provider/Store';
import { authByUsernameReducer } from '../../model/slice/authByUserNameSlice';
import { LoginForm } from './LoginForm';

export default {
	title: 'features/AuthByUsername/LoginForm',
	component: LoginForm,
	decorators: [RouterDecorator()],
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm />;

const state: DeepPartial<StateSchema> = {
	authByUsername: {
		password: 'password',
		username: 'User',
	},
};

const reducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	authByUsername: authByUsernameReducer,
};

export const Normal = Template.bind({});
Normal.decorators = [
	StoreDecorator(
		state as StateSchema,
		reducers as ReducersMapObject<StateSchema>,
	),
];
