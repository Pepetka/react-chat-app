import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendSchema } from '../types/friendSchema';

const initialState: FriendSchema = {};

export const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		example: (state, { payload }: PayloadAction<any>) => {},
	},
});

export const { actions: friendActions, reducer: friendReducer } = friendSlice;
