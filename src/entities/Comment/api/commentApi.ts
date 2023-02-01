import { rtkApi } from '@/shared/api/rtkApi';
import { Comment } from '../model/types/commentSchema';
import { getUserAuthData } from '@/entities/User';
import { StateSchema } from '@/app/provider/Store';

interface ICommentApiProps {
	postId: string;
}

const postApi = rtkApi.injectEndpoints({
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
				const patchResult = dispatch(
					postApi.util.updateQueryData('fetchComments', { postId }, (draft) => {
						draft.push({
							id: String(Math.random()),
							author: getUserAuthData(getState() as StateSchema)!,
							text,
							postId,
							createdAt: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toLocaleDateString()}`,
						});
					}),
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
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
				{ dispatch, queryFulfilled },
			) {
				const patchResult = dispatch(
					postApi.util.updateQueryData('fetchComments', { postId }, (draft) => {
						const index = draft.findIndex(
							(comment) => comment.id === commentId,
						);
						draft.splice(index, 1);
					}),
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
	useAddCommentMutation,
	useDeleteCommentMutation,
	useFetchCommentsQuery,
} = postApi;
