import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { Relations } from '@/features/ProfileCard/model/types/profileCardSchema';

interface IProfileCardApiProps {
	userId: string;
	friendId: string;
}

const profileCardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchProfileData: build.query<
			Array<User>,
			Omit<IProfileCardApiProps, 'friendId'>
		>({
			query: ({ userId }) => ({
				url: '/users',
				params: {
					id: userId,
				},
			}),
		}),
		fetchRelationsData: build.query<Relations, IProfileCardApiProps>({
			query: ({ userId, friendId }) => ({
				url: '/relations',
				params: {
					userId,
					friendId,
				},
			}),
		}),
		addFriend: build.mutation<User, IProfileCardApiProps>({
			query: ({ userId, friendId }) => ({
				method: 'POST',
				url: '/friends',
				body: {
					userId,
					friendId,
				},
			}),
		}),
	}),
});

export const {
	useFetchProfileDataQuery,
	useAddFriendMutation,
	useFetchRelationsDataQuery,
} = profileCardApi;
