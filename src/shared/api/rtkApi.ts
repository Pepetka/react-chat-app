import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE_AUTH_KEY } from '@/shared/const/localstorage';

export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		prepareHeaders: (headers) => {
			const authData = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

			if (authData) {
				const userData = JSON.parse(authData) as { id: string };
				headers.set('authorization', JSON.stringify(userData.id));
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ['social', 'post', 'postStats', 'comment', 'messages'],
});
