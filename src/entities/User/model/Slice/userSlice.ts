import { User, UserSchema } from '../types/UserSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSchema = {
	authData: undefined,
	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.authData = payload;
			state._inited = true;
		},
		removeUser: (state) => {
			state.authData = undefined;
			state._inited = false;
		},
	},
});

export const { actions: userActions, reducer: userReducer } = userSlice;
