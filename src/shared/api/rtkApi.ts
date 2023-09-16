import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
	LOCAL_STORAGE_AUTH_ACCESS_KEY,
	LOCAL_STORAGE_AUTH_REFRESH_KEY,
} from '@/shared/const/localstorage';
import { User } from '@/shared/types/userCard';
import { userActions } from '@/entities/User';
import { getSocket } from '@/shared/api/socketApi';

const baseQuery = fetchBaseQuery({
	baseUrl: __API__,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem(LOCAL_STORAGE_AUTH_ACCESS_KEY);

		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

const baseQueryWithRelogin: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		console.log(result.error.status);
		// try to get a new token
		const refreshToken = localStorage.getItem(LOCAL_STORAGE_AUTH_REFRESH_KEY);
		const refreshResult = await baseQuery(
			{
				url: '/relogin',
				method: 'POST',
				body: {
					refreshToken,
				},
			},
			api,
			extraOptions,
		);
		if (refreshResult.data) {
			const refreshTokenResult = refreshResult.data as User;

			// store the new token
			localStorage.setItem(
				LOCAL_STORAGE_AUTH_ACCESS_KEY,
				refreshTokenResult.accessToken!,
			);
			localStorage.setItem(
				LOCAL_STORAGE_AUTH_REFRESH_KEY,
				refreshTokenResult.refreshToken!,
			);

			// retry the initial query
			result = await baseQuery(args, api, extraOptions);
		} else {
			const socket = getSocket();
			socket.disconnect();

			api.dispatch(userActions.removeUser());
		}
	}

	return result;
};

export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: baseQueryWithRelogin,
	refetchOnReconnect: true,
	endpoints: () => ({}),
	tagTypes: ['social', 'post', 'postStats', 'comment', 'messages'],
});
