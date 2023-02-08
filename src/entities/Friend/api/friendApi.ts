import { rtkApi } from '@/shared/api/rtkApi';
import { UserMini } from '@/shared/types/userCard';
import { StateSchema } from '@/app/provider/Store';
import { getUserAuthData } from '@/entities/User';

interface IPostApiProps {
	userId: string;
	search?: string;
}

export interface IPostApiResponse {
	Friends?: Array<UserMini>;
	Followers?: Array<UserMini>;
	Following?: Array<UserMini>;
	Others?: Array<UserMini>;
}

export const friendApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchFriends: build.query<IPostApiResponse, IPostApiProps>({
			query: ({ userId, search }) => ({
				url: '/getUsers',
				params: {
					userId,
					search,
				},
			}),
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
					friendApi.util.updateQueryData(
						'fetchFriends',
						{ userId, search },
						(draft) => {
							const pushObject: Record<
								keyof IPostApiResponse,
								keyof IPostApiResponse
							> = {
								Friends: 'Followers',
								Followers: 'Friends',
								Following: 'Others',
								Others: 'Following',
							};

							let isFind = false;

							// @ts-ignore
							Object.keys(draft).forEach((key: keyof IPostApiResponse) => {
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

export const { useLazyFetchFriendsQuery, useAddFriendMutation } = friendApi;
