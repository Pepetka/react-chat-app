import { rtkApi } from '@/shared/api/rtkApi';
import { Post } from '../model/types/postSchema';

interface IPostApiProps {
	profileId: string;
	userId: string;
}

const postApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchPostsData: build.query<Array<Post>, Omit<IPostApiProps, 'userId'>>({
			query: ({ profileId }) => ({
				url: '/posts',
				params: {
					userId: profileId,
				},
			}),
			providesTags: (result) => ['post'],
		}),
		addPost: build.mutation<
			Post,
			{ authorId: string; img: string; text: string; profileId: string }
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
		deletePost: build.mutation<Post, { postId: string; userId: string }>({
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
	}),
});

export const {
	useFetchPostsDataQuery,
	useAddPostMutation,
	useDeletePostMutation,
} = postApi;
