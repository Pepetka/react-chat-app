import { rtkApi } from '@/shared/api/rtkApi';
import { Comment } from '@/shared/types/comment';
import { getSocket } from '@/shared/api/socketApi';
import { socketError } from '@/shared/config/RTKQuery/socketError';

interface ICommentApiProps {
	postId: string;
}

const postCommentsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchComments: build.query<Array<Comment>, ICommentApiProps>({
			queryFn: () => {
				return { data: [] };
			},
			async onCacheEntryAdded(
				arg,
				{ cacheDataLoaded, cacheEntryRemoved, requestId, dispatch },
			) {
				try {
					await cacheDataLoaded;

					const socket = getSocket();

					socket.emit('comments', arg.postId);

					socket.on(
						'comments',
						(data: { postId: string; comments: Array<Comment> }) => {
							dispatch(
								postCommentsApi.util.updateQueryData(
									'fetchComments',
									{ postId: data.postId },
									() => {
										return data.comments;
									},
								),
							);
							dispatch(postCommentsApi.util.invalidateTags(['postStats']));
						},
					);

					await cacheEntryRemoved;

					socket.off('comments');
				} catch (e) {
					console.error(e);

					dispatch(
						socketError({
							arg,
							requestId,
							error: e as Error,
							endpointName: 'fetchComments',
						}),
					);
				}
			},
		}),
		addComment: build.mutation<
			Omit<Comment, 'author'> & { authorId: string },
			{ authorId: string; text: string; postId: string }
		>({
			queryFn: async (props) => {
				const socket = getSocket();
				const data: Omit<Comment, 'author'> & { authorId: string } =
					await new Promise((resolve) => {
						socket.emit(
							'new_comment',
							props,
							(data: Omit<Comment, 'author'> & { authorId: string }) => {
								resolve(data);
							},
						);
					});

				return {
					data,
				};
			},
			// async onQueryStarted(
			// 	{ text, postId },
			// 	{ dispatch, queryFulfilled, getState },
			// ) {
			// 	const userData = getUserAuthData(getState() as StateSchema);
			// 	const author: UserMini = {
			// 		id: userData?.id ?? '',
			// 		name: `${userData?.firstname} ${userData?.lastname}`,
			// 		avatar: userData?.avatar ?? '',
			// 	};
			//
			// 	const patchResult = dispatch(
			// 		postCommentsApi.util.updateQueryData(
			// 			'fetchComments',
			// 			{ postId },
			// 			(draft) => {
			// 				draft.unshift({
			// 					id: String(Math.random()),
			// 					author,
			// 					text,
			// 					postId,
			// 					createdAt: `${addZeros(new Date().getHours())}:${addZeros(
			// 						new Date().getMinutes(),
			// 					)} ${new Date().toLocaleDateString()}`,
			// 				});
			// 			},
			// 		),
			// 	);
			// 	const patchResultPost = dispatch(
			// 		postApi.util.updateQueryData(
			// 			'fetchPostStats',
			// 			{ postId, userId: userData?.id ?? '' },
			// 			(draft) => {
			// 				Object.assign(draft, {
			// 					comments: String(Number(draft.comments) + 1),
			// 				});
			// 			},
			// 		),
			// 	);
			// 	try {
			// 		await queryFulfilled;
			// 	} catch {
			// 		patchResult.undo();
			// 		patchResultPost.undo();
			// 	}
			// },
			// invalidatesTags: ['comment', 'postStats'],
		}),
		deleteComment: build.mutation<
			string,
			{ commentId: string; postId: string }
		>({
			queryFn: async (props) => {
				const socket = getSocket();

				const data: string = await new Promise((resolve) => {
					socket.emit('delete_comment', props, (data: string) => {
						resolve(data);
					});
				});

				return {
					data,
				};
			},
			// async onQueryStarted(
			// 	{ commentId, postId },
			// 	{ dispatch, queryFulfilled, getState },
			// ) {
			// 	const userData = getUserAuthData(getState() as StateSchema);
			//
			// 	const patchResult = dispatch(
			// 		postCommentsApi.util.updateQueryData(
			// 			'fetchComments',
			// 			{ postId },
			// 			(draft) => {
			// 				const index = draft.findIndex(
			// 					(comment) => comment.id === commentId,
			// 				);
			// 				draft.splice(index, 1);
			// 			},
			// 		),
			// 	);
			// 	const patchResultPost = dispatch(
			// 		postApi.util.updateQueryData(
			// 			'fetchPostStats',
			// 			{ postId, userId: userData?.id ?? '' },
			// 			(draft) => {
			// 				Object.assign(draft, {
			// 					comments: String(Number(draft.comments) - 1),
			// 				});
			// 			},
			// 		),
			// 	);
			// 	try {
			// 		await queryFulfilled;
			// 	} catch {
			// 		patchResult.undo();
			// 		patchResultPost.undo();
			// 	}
			// },
			// invalidatesTags: ['postStats'],
		}),
	}),
});

export const {
	useAddCommentMutation,
	useDeleteCommentMutation,
	useFetchCommentsQuery,
} = postCommentsApi;
