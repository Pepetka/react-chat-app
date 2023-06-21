import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupSchema } from '../types/groupSchema';

const initialState: GroupSchema = {
	search: '',
};

export const groupSlice = createSlice({
	name: 'group',
	initialState,
	reducers: {
		setSearch: (state, { payload }: PayloadAction<string>) => {
			state.search = payload;
		},
	},
});

export const { actions: groupActions, reducer: groupReducer } = groupSlice;
