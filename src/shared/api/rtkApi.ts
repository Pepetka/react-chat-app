import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOCAL_STORAGE_AUTH_KEY } from '@/shared/const/localstorage';
import { __API__ } from '@/shared/const/api';

export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		prepareHeaders: (headers) => {
			if (localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) {
				const userData = JSON.parse(
					localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)!,
				) as { id: string };
				headers.set('authorization', JSON.stringify(userData.id));
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: ['social', 'post'],
});
