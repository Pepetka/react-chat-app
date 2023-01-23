import { rtkApi } from '@/shared/api/rtkApi';
import { Social } from '../model/types/socialCardSchema';
import { User } from '@/entities/User';

interface ISocialCardApiProps {
	userId: string;
}

const socialCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchSocialData: build.query<Social, ISocialCardApiProps>({
			query: ({ userId }) => ({
				url: '/social',
				params: {
					userId,
				},
			}),
			providesTags: (result) => ['social'],
		}),
		fetchFriendsData: build.query<Array<User>, ISocialCardApiProps>({
			query: ({ userId }) => ({
				url: '/friends',
				params: {
					userId,
				},
			}),
			providesTags: (result) => ['social'],
		}),
	}),
});

export const { useFetchSocialDataQuery, useFetchFriendsDataQuery } =
	socialCardApi;
