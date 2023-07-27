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
			transformResponse: (data: Array<Chat>) => {
				data.map((chat) => {
					chat.user = {
						...chat.user,
						avatar: `${__API__}/images/${chat.user.avatar}`,
					};

					return chat;
				});

				return data;
			},
		}),
	}),
});

export const { useLazyFetchChatsQuery } = searchChatsByNameApi;
