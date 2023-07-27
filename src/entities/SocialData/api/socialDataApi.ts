import { rtkApi } from '@/shared/api/rtkApi';
import { UserMini } from '@/shared/types/userCard';
import { Social } from '../model/types/socialDataSchema';

interface ISocialCardApiProps {
	profileId: string;
}

export const socialDataApi = rtkApi.injectEndpoints({
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
		fetchFriendsData: build.query<Array<UserMini>, ISocialCardApiProps>({
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
	socialDataApi;
