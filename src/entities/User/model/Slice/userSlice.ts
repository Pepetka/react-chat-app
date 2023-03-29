import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_AUTH_KEY } from '@/shared/const/localstorage';
import { User } from '@/shared/types/userCard';
import { UserSchema } from '../types/UserSchema';

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
