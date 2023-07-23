import { Meta, StoryFn } from '@storybook/react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/provider/Store';
import {
	StoreDecorator,
	RouterDecorator,
} from '@/shared/config/storybook/decorators';
import { registerByUsernameReducer } from '../../model/slice/registerByUserNameSlice';
import { RegisterForm } from './RegisterForm';

export default {
	title: 'features/RegisterByUsername/RegisterForm',
	component: RegisterForm,
	decorators: [
		RouterDecorator(),
		(StoryComponent) => {
			return (
				<div
					style={{
						overflowY: 'auto',
						overflowX: 'hidden',
						width: '100%',
						height: '100%',
					}}
				>
					<StoryComponent />
				</div>
			);
		},
	],
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

const reducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	registerByUsername: registerByUsernameReducer,
};

export const Normal = Template.bind({});
Normal.decorators = [
	StoreDecorator(
		state as StateSchema,
		reducers as ReducersMapObject<StateSchema>,
	),
];
