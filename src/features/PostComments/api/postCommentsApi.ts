import { rtkApi } from '@/shared/api/rtkApi';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { StateSchema } from '@/app/provider/Store';
import { postApi } from '@/entities/Post';

interface ICommentApiProps {
	postId: string;
}

const postCommentsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchComments: build.query<Array<Comment>, ICommentApiProps>({
			query: ({ postId }) => ({
				url: '/comments',
				params: {
					postId,
				},
			}),
			providesTags: (result) => ['comment'],
		}),
		addComment: build.mutation<
			Omit<Comment, 'author'> & { authorId: string },
			{ authorId: string; text: string; postId: string }
		>({
			query: ({ authorId, text, postId }) => ({
				url: '/comments',
				method: 'POST',
				body: {
					authorId,
					text,
					postId,
				},
			}),
			async onQueryStarted(
				{ text, postId },
				{ dispatch, queryFulfilled, getState },
			) {
				const userData = getUserAuthData(getState() as StateSchema)!;

				const patchResult = dispatch(
					postCommentsApi.util.updateQueryData(
						'fetchComments',
						{ postId },
						(draft) => {
							draft.unshift({
								id: String(Math.random()),
								author: userData,
								text,
								postId,
								createdAt: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toLocaleDateString()}`,
							});
						},
					),
				);
				const patchResultPost = dispatch(
					postApi.util.updateQueryData(
						'fetchPostStats',
						{ postId, userId: userData.id },
						(draft) => {
							Object.assign(draft, {
								comments: String(Number(draft.comments) + 1),
							});
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
					patchResultPost.undo();
				}
			},
			invalidatesTags: ['comment', 'postStats'],
		}),
		deleteComment: build.mutation<
			Omit<Comment, 'author'> & { authorId: string },
			{ commentId: string; postId: string }
		>({
			query: ({ commentId }) => ({
				url: '/comments',
				method: 'PUT',
				params: {
					commentId,
				},
			}),
			async onQueryStarted(
				{ commentId, postId },
				{ dispatch, queryFulfilled, getState },
			) {
				const userData = getUserAuthData(getState() as StateSchema)!;

				const patchResult = dispatch(
					postCommentsApi.util.updateQueryData(
						'fetchComments',
						{ postId },
						(draft) => {
							const index = draft.findIndex(
								(comment) => comment.id === commentId,
							);
							draft.splice(index, 1);
						},
					),
				);
				const patchResultPost = dispatch(
					postApi.util.updateQueryData(
						'fetchPostStats',
						{ postId, userId: userData.id },
						(draft) => {
							Object.assign(draft, {
								comments: String(Number(draft.comments) - 1),
							});
						},
					),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
					patchResultPost.undo();
				}
			},
			invalidatesTags: ['postStats'],
		}),
	}),
});

export const {
	useAddCommentMutation,
	useDeleteCommentMutation,
	useFetchCommentsQuery,
} = postCommentsApi;
