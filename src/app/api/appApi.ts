import { rtkApi } from '@/shared/api/rtkApi';
import { Online } from '@/shared/types/online';

interface IAppApiProps {
	userId: string;
}

export const appApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		setOnline: build.mutation<Online, IAppApiProps>({
			query: ({ userId }) => ({
				url: '/online',
				method: 'Post',
				body: {
					userId,
				},
			}),
		}),
	}),
});

export const { useSetOnlineMutation } = appApi;
