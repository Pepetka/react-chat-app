import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageSchema } from '../types/messageSchema';

const initialState: MessageSchema = {
	text: '',
	images: '',
};

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setText: (state, { payload }: PayloadAction<string>) => {
			state.text = payload;
		},
		setImages: (state, { payload }: PayloadAction<string>) => {
			state.images = payload;
		},
		clear: (state) => {
			state.images = '';
			state.text = '';
		},
	},
});

export const { actions: messageActions, reducer: messageReducer } =
	messageSlice;
