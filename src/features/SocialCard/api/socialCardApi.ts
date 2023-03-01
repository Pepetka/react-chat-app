import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '@/shared/types/userCard';
import { Social } from '../model/types/socialCardSchema';

interface ISocialCardApiProps {
	profileId: string;
}

export const socialCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchSocialData: build.query<Social, ISocialCardApiProps>({
			query: ({ profileId }) => ({
				url: '/social',
				params: {
					userId: profileId,
				},
			}),
			providesTags: (result) => ['social'],
		}),
		fetchFriendsData: build.query<Array<User>, ISocialCardApiProps>({
			query: ({ profileId }) => ({
				url: '/friends',
				params: {
					userId: profileId,
				},
			}),
			providesTags: (result) => ['social'],
		}),
	}),
});

export const { useFetchSocialDataQuery, useFetchFriendsDataQuery } =
	socialCardApi;
