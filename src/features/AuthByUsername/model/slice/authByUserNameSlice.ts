import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthByUsernameSchema } from '../types/AuthByUsernameSchema';

const initialState: AuthByUsernameSchema = {
	password: '',
	username: '',
};

export const authByUsernameSlice = createSlice({
	name: 'authByUsername',
	initialState,
	reducers: {
		setPassword: (state, { payload }: PayloadAction<string>) => {
			state.password = payload;
		},
		setUsername: (state, { payload }: PayloadAction<string>) => {
			state.username = payload;
		},
		clear: (state) => {
			state.username = '';
			state.password = '';
		},
	},
});

export const {
	actions: authByUsernameActions,
	reducer: authByUsernameReducer,
} = authByUsernameSlice;
