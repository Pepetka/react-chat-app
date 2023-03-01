import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatSchema } from '../types/chatSchema';

const initialState: ChatSchema = {
	search: '',
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setSearch: (state, { payload }: PayloadAction<string>) => {
			state.search = payload;
		},
	},
});

export const { actions: chatActions, reducer: chatReducer } = chatSlice;
