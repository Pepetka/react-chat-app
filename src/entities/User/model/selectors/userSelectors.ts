import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/provider/Store';
import { UserSchema } from '../types/UserSchema';

export const getUserState = (state: StateSchema) => state.user;
export const getUserAuthData = createSelector(
	getUserState,
	(user: UserSchema) => user.authData,
);
export const getUserInited = createSelector(
	getUserState,
	(user: UserSchema) => user._inited,
);
