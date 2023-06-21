import { rtkApi } from '@/shared/api/rtkApi';
import { getUserAuthData } from '@/entities/User';
import { StateSchema } from '@/app/provider/Store';
import { UserMini } from '@/shared/types/userCard';
import { addZeros } from '@/shared/helpers/addZeros';
import { Post, PostStats, UserPost } from '../model/types/postSchema';

interface IPostApiProps {
	profileId: string;
	userId: string;
	postId: string;
}

export const postApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchPostsData: build.query<Array<Post>, Pick<IPostApiProps, 'profileId'>>({
			query: ({ profileId }) => ({
				url: '/posts',
				params: {
					userId: profileId,
				},
			}),
			providesTags: () => ['post'],
		}),
		addPost: build.mutation<
			Omit<Post, 'author'> & { authorId: string },
			{
				authorId: string;
				img?: Array<string>;
				text: string;
				profileId: string;
				authorData?: UserMini;
			}
		>({
			query: ({ authorId, img, text, profileId }) => ({
				url: '/posts',
				method: 'POST',
				body: {
					authorId,
					text,
					img,
					profileId,
				},
			}),
			async onQueryStarted(
				{ img, text, profileId, authorData },
				{ dispatch, queryFulfilled, getState },
			) {
				const authData = getUserAuthData(getState() as StateSchema);
				const author: UserMini = authorData ?? {
					id: authData?.id ?? '',
					name: `${authData?.firstname} ${authData?.lastname}`,
					avatar: authData?.avatar ?? '',
				};

				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'fetchPostsData',
						{ profileId },
						(draft) => {
							draft.unshift({
								id: String(Math.random()),
								author,
								img,
								text,
								createdAt: `${addZeros(new Date().getHours())}:${addZeros(
									new Date().getMinutes(),
								)} ${new Date().toLocaleDateString()}`,
							});
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['post'],
		}),
		deletePost: build.mutation<
			Omit<Post, 'author'> & { authorId: string },
			Omit<IPostApiProps, 'profileId'>
		>({
			query: ({ postId, userId }) => ({
				url: '/posts',
				method: 'PUT',
				params: {
					postId,
					userId,
				},
			}),
			async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'fetchPostsData',
						{ profileId: userId },
						(draft) => {
							const index = draft.findIndex((post) => post.id === postId);
							draft.splice(index, 1);
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
		sharePost: build.mutation<UserPost, Omit<IPostApiProps, 'profileId'>>({
			query: ({ postId, userId }) => ({
				url: '/share',
				method: 'POST',
				body: {
					postId,
					userId,
				},
			}),
			async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'fetchPostStats',
						{ postId, userId },
						(draft) => {
							if (!draft.isShared) {
								Object.assign(draft, {
									shared: String(Number(draft.shared) + 1),
									isShared: true,
								});
							}
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['postStats'],
		}),
		fetchPostStats: build.query<PostStats, Omit<IPostApiProps, 'profileId'>>({
			query: ({ postId, userId }) => ({
				url: '/postStats',
				params: {
					postId,
					userId,
				},
			}),
			providesTags: () => ['post', 'postStats'],
		}),
		likePost: build.mutation<
			Omit<IPostApiProps, 'profileId'>,
			Omit<IPostApiProps, 'profileId'>
		>({
			query: ({ postId, userId }) => ({
				url: '/like',
				method: 'POST',
				body: {
					postId,
					userId,
				},
			}),
			async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'fetchPostStats',
						{ postId, userId },
						(draft) => {
							if (draft.isLiked) {
								Object.assign(draft, {
									likes: String(Number(draft.likes) - 1),
									isLiked: false,
								});
							} else if (draft.isDisliked) {
								Object.assign(draft, {
									likes: String(Number(draft.likes) + 1),
									isLiked: true,
									dislikes: String(Number(draft.dislikes) - 1),
									isDisliked: false,
								});
							} else {
								Object.assign(draft, {
									likes: String(Number(draft.likes) + 1),
									isLiked: true,
								});
							}
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['postStats'],
		}),
		dislikePost: build.mutation<
			Omit<IPostApiProps, 'profileId'>,
			Omit<IPostApiProps, 'profileId'>
		>({
			query: ({ postId, userId }) => ({
				url: '/dislike',
				method: 'POST',
				body: {
					postId,
					userId,
				},
			}),
			async onQueryStarted({ postId, userId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					postApi.util.updateQueryData(
						'fetchPostStats',
						{ postId, userId },
						(draft) => {
							if (draft.isDisliked) {
								Object.assign(draft, {
									dislikes: String(Number(draft.dislikes) - 1),
									isDisliked: false,
								});
							} else if (draft.isLiked) {
								Object.assign(draft, {
									dislikes: String(Number(draft.dislikes) + 1),
									isDisliked: true,
									likes: String(Number(draft.likes) - 1),
									isLiked: false,
								});
							} else {
								Object.assign(draft, {
									dislikes: String(Number(draft.dislikes) + 1),
									isDisliked: true,
								});
							}
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
			invalidatesTags: ['postStats'],
		}),
	}),
});

export const {
	useFetchPostsDataQuery,
	useAddPostMutation,
	useDeletePostMutation,
	useSharePostMutation,
	useFetchPostStatsQuery,
	useDislikePostMutation,
	useLikePostMutation,
} = postApi;
