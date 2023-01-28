import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { Relations } from '@/features/ProfileCard/model/types/profileCardSchema';

interface IProfileCardApiProps {
	profileId: string;
	friendId: string;
	userId: string;
}

const profileCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchProfileData: build.query<
			Array<User>,
			Omit<IProfileCardApiProps, 'friendId' | 'userId'>
		>({
			query: ({ profileId }) => ({
				url: '/users',
				params: {
					id: profileId,
				},
			}),
		}),
		fetchRelationsData: build.query<
			Relations,
			Omit<IProfileCardApiProps, 'profileId'>
		>({
			query: ({ userId, friendId }) => ({
				url: '/relations',
				params: {
					userId,
					friendId,
				},
			}),
			providesTags: (result) => ['social'],
		}),
		addFriend: build.mutation<User, Omit<IProfileCardApiProps, 'profileId'>>({
			query: ({ userId, friendId }) => ({
				method: 'POST',
				url: '/friends',
				body: {
					userId,
					friendId,
				},
			}),
			invalidatesTags: ['social'],
		}),
	}),
});

export const {
	useFetchProfileDataQuery,
	useAddFriendMutation,
	useFetchRelationsDataQuery,
} = profileCardApi;
