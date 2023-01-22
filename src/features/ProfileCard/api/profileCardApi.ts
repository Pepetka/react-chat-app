import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

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

export const { useFetchProfileDataQuery, useAddFriendMutation } =
	profileCardApi;
