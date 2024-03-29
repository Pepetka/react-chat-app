import { rtkApi } from '@/shared/api/rtkApi';
import { Chat } from '@/entities/Chat';

interface ISearchChatsByNAmeApiProps {
	userId: string;
	search?: string;
}

export const searchChatsByNameApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		fetchChats: build.query<Array<Chat>, ISearchChatsByNAmeApiProps>({
			query: ({ userId, search }) => ({
				url: '/getChats',
				params: {
					userId,
					search,
				},
			}),
		}),
	}),
});

export const { useLazyFetchChatsQuery } = searchChatsByNameApi;
