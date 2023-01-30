import { rtkApi } from '@/shared/api/rtkApi';
import { Comment } from '../model/types/commentSchema';
import { User } from '@/entities/User';

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
			invalidatesTags: ['comment', 'postStats'],
		}),
		deleteComment: build.mutation<
			Omit<Comment, 'author'> & { authorId: string },
			{ commentId: string }
		>({
			query: ({ commentId }) => ({
				url: '/comments',
				method: 'PUT',
				params: {
					commentId,
				},
			}),
			invalidatesTags: ['comment', 'postStats'],
		}),
	}),
});

export const {
	useAddCommentMutation,
	useDeleteCommentMutation,
	useFetchCommentsQuery,
} = postApi;
