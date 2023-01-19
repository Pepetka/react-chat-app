import { StateSchema } from '@/app/provider/Store';
import { createSelector } from '@reduxjs/toolkit';
import { UserSchema } from '@/entities/User';

export const getUserState = (state: StateSchema) => state.user;
export const getUserAuthData = createSelector(
	getUserState,
	(user: UserSchema) => user.authData,
);
export const getUserInited = createSelector(
	getUserState,
	(user: UserSchema) => user._inited,
);
