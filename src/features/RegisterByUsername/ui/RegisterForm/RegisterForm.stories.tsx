import { Meta, StoryFn } from '@storybook/react';
import { RegisterForm } from './RegisterForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { StateSchema } from '@/app/provider/Store';
import { DeepPartial } from 'redux';

export default {
	title: 'features/RegisterByUsername/RegisterForm',
	component: RegisterForm,
} as Meta<typeof RegisterForm>;

const Template: StoryFn<typeof RegisterForm> = (args) => <RegisterForm />;

const state: DeepPartial<StateSchema> = {
	registerByUsername: {
		lastname: '',
		firstname: '',
		email: '',
		age: 0,
		password: '',
		username: '',
	},
};

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator(state as StateSchema)];
