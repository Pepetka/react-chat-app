import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendSchema } from '../types/friendSchema';

const initialState: FriendSchema = {
	search: '',
};

export const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		setSearch: (state, { payload }: PayloadAction<string>) => {
			state.search = payload;
		},
	},
});

export const { actions: friendActions, reducer: friendReducer } = friendSlice;
