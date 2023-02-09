import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentSchema } from '../types/commentSchema';

const initialState: CommentSchema = {
	text: '',
};

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		setText: (state, { payload }: PayloadAction<string>) => {
			state.text = payload;
		},
		clear: (state) => {
			state.text = '';
		},
	},
});

export const { actions: commentActions, reducer: commentReducer } =
	commentSlice;
