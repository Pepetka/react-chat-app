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
			async onQueryStarted({ userId, friendId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					profileCardApi.util.updateQueryData(
						'fetchRelationsData',
						{ userId, friendId },
						(draft) => {
							const relationsObj: Record<
								Relations['relations'],
								Relations['relations']
							> = {
								nobody: 'following',
								friend: 'follower',
								following: 'nobody',
								follower: 'friend',
							};

							draft.relations = relationsObj[draft.relations];
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['social'],
		}),
	}),
});

export const {
	useFetchProfileDataQuery,
	useAddFriendMutation,
	useFetchRelationsDataQuery,
} = profileCardApi;
