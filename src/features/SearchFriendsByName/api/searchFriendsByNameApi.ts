import { rtkApi } from '@/shared/api/rtkApi';
import { UserMini } from '@/shared/types/userCard';
import { UsersLists } from '@/entities/Friend';

interface ISearchFriendsByNameApiProps {
	userId: string;
	search?: string;
}

export const searchFriendsByNameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchFriends: build.query<UsersLists, ISearchFriendsByNameApiProps>({
			query: ({ userId, search }) => ({
				url: '/getUsers',
				params: {
					userId,
					search,
				},
			}),
			transformResponse: (data: UsersLists) => {
				data.Followers = data.Followers?.map((follower) => ({
					...follower,
					avatar: `${__API__}/images/${follower.avatar}`,
				}));
				data.Following = data.Following?.map((following) => ({
					...following,
					avatar: `${__API__}/images/${following.avatar}`,
				}));
				data.Friends = data.Friends?.map((friend) => ({
					...friend,
					avatar: `${__API__}/images/${friend.avatar}`,
				}));
				data.Others = data.Others?.map((user) => ({
					...user,
					avatar: `${__API__}/images/${user.avatar}`,
				}));

				return data;
			},
		}),
		addFriend: build.mutation<
			UserMini,
			{ userId: string; friendId: string; search: string }
		>({
			query: ({ userId, friendId, search }) => ({
				method: 'POST',
				url: '/friends',
				body: {
					userId,
					friendId,
				},
			}),
			async onQueryStarted(
				{ userId, friendId, search },
				{ dispatch, queryFulfilled, getState },
			) {
				const patchResultFriends = dispatch(
					searchFriendsByNameApi.util.updateQueryData(
						'fetchFriends',
						{ userId, search },
						(draft) => {
							const pushObject: Record<keyof UsersLists, keyof UsersLists> = {
								Friends: 'Followers',
								Followers: 'Friends',
								Following: 'Others',
								Others: 'Following',
							};

							let isFind = false;

							// @ts-ignore
							Object.keys(draft).forEach((key: keyof UsersLists) => {
								if (
									draft[key]?.find((user) => user.id === friendId) &&
									!isFind
								) {
									isFind = true;
									const element = draft[key]!.find(
										(user) => user.id === friendId,
									);
									const index = draft[key]!.findIndex(
										(user) => user.id === friendId,
									);

									if (draft[key]!.length === 1) {
										draft[key] = undefined;
									} else {
										draft[key]!.splice(index, 1);
									}

									if (draft[pushObject[key]]) {
										draft[pushObject[key]]!.push(element!);
									} else {
										draft[pushObject[key]] = [element!];
									}
								}
							});
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResultFriends.undo();
				}
			},
		}),
	}),
});

export const { useLazyFetchFriendsQuery, useAddFriendMutation } =
	searchFriendsByNameApi;
