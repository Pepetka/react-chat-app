import { StateSchema } from '@/app/provider/Store';
import { createSelector } from '@reduxjs/toolkit';
import { FriendSchema } from '@/entities/Friend';

export const getFriendSearch = createSelector(
	(state: StateSchema) => state.friend ?? { search: '' },
	(state: FriendSchema) => state.search,
);
