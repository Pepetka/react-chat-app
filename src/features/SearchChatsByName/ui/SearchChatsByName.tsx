import { memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { ChatForm, ChatList } from '@/entities/Chat';
import { useLazyFetchChatsQuery } from '../api/searchChatsByNameApi';

interface ISearchChatsByNameProps {
	userId: string;
}

export const SearchChatsByName = memo((props: ISearchChatsByNameProps) => {
	const { userId } = props;
	const [searchParams] = useSearchParams();
	const [onFetchChats, { data: chats, isFetching: isLoading, isError }] =
		useLazyFetchChatsQuery();

	useEffect(() => {
		onFetchChats({
			userId,
			search: searchParams.get('search') ?? '',
		});
		// eslint-disable-next-line
	}, [onFetchChats, userId]);

	return (
		<Flex direction="column" gap="24">
			<ChatForm
				data-testid="SearchChatsByName"
				userId={userId}
				fetchChats={onFetchChats}
			/>
			<ChatList
				data-testid="SearchChatsByName"
				isLoading={isLoading}
				isError={isError}
				chats={chats}
			/>
		</Flex>
	);
});
