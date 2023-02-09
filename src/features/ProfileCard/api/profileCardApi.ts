import { getUserAuthData } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { Relations } from '../model/types/profileCardSchema';
import { socialCardApi } from '@/features/SocialCard';
import { getRelations } from '../model/selectors/profileCardSelectors';
import { StateSchema } from '@/app/provider/Store';
import { User, UserMini } from '@/shared/types/userCard';

interface IProfileCardApiProps {
	profileId: string;
	friendId: string;
	userId: string;
}

export const profileCardApi = rtkApi.injectEndpoints({
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
		addFriend: build.mutation<
			UserMini,
			Omit<IProfileCardApiProps, 'profileId'>
		>({
			query: ({ userId, friendId }) => ({
				method: 'POST',
				url: '/friends',
				body: {
					userId,
					friendId,
				},
			}),
			async onQueryStarted(
				{ userId, friendId },
				{ dispatch, queryFulfilled, getState },
			) {
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

				const patchResultSocial = dispatch(
					socialCardApi.util.updateQueryData(
						'fetchSocialData',
						{ profileId: friendId },
						(draft) => {
							const relations = getRelations(getState() as StateSchema, {
								userId,
								friendId,
							});

							if (relations?.relations === 'follower') {
								draft.followingNum = String(Number(draft.followingNum) + 1);
							}

							if (relations?.relations === 'friend') {
								draft.followingNum = String(Number(draft.followingNum) - 1);
							}

							if (relations?.relations === 'nobody') {
								draft.followersNum = String(Number(draft.followersNum) - 1);
							}

							if (relations?.relations === 'following') {
								draft.followersNum = String(Number(draft.followersNum) + 1);
							}
						},
					),
				);

				const patchResultFriends = dispatch(
					socialCardApi.util.updateQueryData(
						'fetchFriendsData',
						{ profileId: friendId },
						(draft) => {
							const relations = getRelations(getState() as StateSchema, {
								userId,
								friendId,
							});
							const userData = getUserAuthData(getState() as StateSchema)!;

							if (relations?.relations === 'follower') {
								const index = draft.findIndex(
									(user) => user.id === userData.id,
								);
								draft.splice(index, 1);
							}

							if (relations?.relations === 'friend') {
								draft.push(userData);
							}
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
					patchResultSocial.undo();
					patchResultFriends.undo();
				}
			},
		}),
	}),
});

export const {
	useFetchProfileDataQuery,
	useAddFriendMutation,
	useFetchRelationsDataQuery,
} = profileCardApi;
