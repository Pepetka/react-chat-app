import { rtkApi } from '@/shared/api/rtkApi';
import { Post } from '../model/types/postSchema';

interface IPostApiProps {
	userId: string;
}

const postApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchPostsData: build.query<Array<Post>, IPostApiProps>({
			query: ({ userId }) => ({
				url: '/posts',
				params: {
					authorId: userId,
				},
			}),
			providesTags: (result) => ['post'],
		}),
		addPost: build.mutation<Post, IPostApiProps>({
			query: ({ userId }) => ({
				url: '/posts',
				method: 'POST',
				body: {
					userId,
				},
			}),
			invalidatesTags: ['post'],
		}),
	}),
});

export const { useFetchPostsDataQuery, useAddPostMutation } = postApi;
