import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostSchema } from '../types/postSchema';

const initialState: PostSchema = {
	text: '',
	img: '',
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setText: (state, { payload }: PayloadAction<string>) => {
			state.text = payload;
		},
		setImg: (state, { payload }: PayloadAction<string>) => {
			state.img = payload;
		},
		clear: (state) => {
			state.text = '';
			state.img = '';
		},
	},
});

export const { actions: postActions, reducer: postReducer } = postSlice;
