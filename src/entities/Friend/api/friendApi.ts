import { rtkApi } from '@/shared/api/rtkApi';
import { UserMini } from '@/shared/types/userCard';

interface IPostApiProps {
	userId: string;
}

interface IPostApiResponse {
	Friends?: Array<UserMini>;
	Followers?: Array<UserMini>;
	Following?: Array<UserMini>;
	Others?: Array<UserMini>;
}

export const friendApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchFriends: build.query<IPostApiResponse, IPostApiProps>({
			query: ({ userId }) => ({
				url: '/getUsers',
				params: {
					userId,
				},
			}),
		}),
	}),
});

export const { useFetchFriendsQuery, useLazyFetchFriendsQuery } = friendApi;
