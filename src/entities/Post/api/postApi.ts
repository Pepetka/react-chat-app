import { rtkApi } from '@/shared/api/rtkApi';
import { Post, PostStats, UserPost } from '../model/types/postSchema';

interface IPostApiProps {
	profileId: string;
	userId: string;
	postId: string;
}

const postApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchPostsData: build.query<
			Array<Post>,
			Omit<IPostApiProps, 'userId' | 'postId'>
		>({
			query: ({ profileId }) => ({
				url: '/posts',
				params: {
					userId: profileId,
				},
			}),
			providesTags: (result) => ['post'],
		}),
		addPost: build.mutation<
			Omit<Post, 'author'> & { authorId: string },
			{ authorId: string; img?: Array<string>; text: string; profileId: string }
		>({
			query: ({ authorId, img, text, profileId }) => ({
				url: '/posts',
				method: 'POST',
				body: {
					authorId,
					text,
					img,
					userId: profileId,
				},
			}),
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
			invalidatesTags: ['post'],
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
			providesTags: (result) => ['post', 'postStats'],
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
