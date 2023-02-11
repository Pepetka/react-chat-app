import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/provider/Store';
import { ChatSchema } from '../types/chatSchema';

export const getChatSearch = createSelector(
	(state: StateSchema) => state.chat ?? { search: '' },
	(state: ChatSchema) => state.search,
);
