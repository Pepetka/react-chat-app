import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterByUsernameSchema } from '../types/RegisterByUsernameSchema';

const initialState: RegisterByUsernameSchema = {
	password: '',
	username: '',
	age: 0,
	email: '',
	firstname: '',
	lastname: '',
};

export const registerByUserNameSlice = createSlice({
	name: 'authByUsername',
	initialState,
	reducers: {
		setPassword: (state, { payload }: PayloadAction<string>) => {
			state.password = payload;
		},
		setUsername: (state, { payload }: PayloadAction<string>) => {
			state.username = payload;
		},
		setAge: (state, { payload }: PayloadAction<number>) => {
			state.age = payload;
		},
		setEmail: (state, { payload }: PayloadAction<string>) => {
			state.email = payload;
		},
		setFirstname: (state, { payload }: PayloadAction<string>) => {
			state.firstname = payload;
		},
		setLastname: (state, { payload }: PayloadAction<string>) => {
			state.lastname = payload;
		},
		clear: (state) => {
			state.password = '';
			state.username = '';
			state.age = 0;
			state.email = '';
			state.firstname = '';
			state.lastname = '';
		},
	},
});

export const {
	actions: registerByUsernameActions,
	reducer: registerByUsernameReducer,
} = registerByUserNameSlice;
