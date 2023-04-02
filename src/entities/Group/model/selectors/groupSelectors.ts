import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/provider/Store';
import { GroupSchema } from '../types/groupSchema';

export const getGroupSearch = createSelector(
	(state: StateSchema) => state.group ?? { search: '' },
	(state: GroupSchema) => state.search,
);
