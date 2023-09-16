import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	LOCAL_STORAGE_AUTH_ACCESS_KEY,
	LOCAL_STORAGE_AUTH_REFRESH_KEY,
	LOCAL_STORAGE_USER_KEY,
} from '@/shared/const/localstorage';
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
			const userData = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

			if (userData) {
				state.authData = JSON.parse(userData);
			}

			state._inited = true;
		},
		setUser: (state, { payload }: PayloadAction<User>) => {
			state.authData = payload;

			localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(payload));
			localStorage.setItem(
				LOCAL_STORAGE_AUTH_ACCESS_KEY,
				`${payload.accessToken}`,
			);
			localStorage.setItem(
				LOCAL_STORAGE_AUTH_REFRESH_KEY,
				`${payload.refreshToken}`,
			);
		},
		removeUser: (state) => {
			state.authData = undefined;

			localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
			localStorage.removeItem(LOCAL_STORAGE_AUTH_ACCESS_KEY);
			localStorage.removeItem(LOCAL_STORAGE_AUTH_REFRESH_KEY);
		},
	},
});

export const { actions: userActions, reducer: userReducer } = userSlice;
