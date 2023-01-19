import { User, UserSchema } from '../types/UserSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_AUTH_KEY } from '@/shared/const/localstorage';

const initialState: UserSchema = {
	authData: undefined,
	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		initUser: (state) => {
			const userData = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

			if (userData) {
				state.authData = JSON.parse(userData);
			}

			state._inited = true;
		},
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.authData = payload;

			localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(payload));
		},
		removeUser: (state) => {
			state.authData = undefined;

			localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
		},
	},
});

export const { actions: userActions, reducer: userReducer } = userSlice;
