import { memo, useEffect } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { ChatForm, ChatList } from '@/entities/Chat';
import { useLazyFetchChatsQuery } from '../api/searchChatsByNameApi';
import { useSearchParams } from 'react-router-dom';

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
	}, [onFetchChats, userId]);

	return (
		<Flex direction="column" gap="24">
			<ChatForm userId={userId} fetchChats={onFetchChats} />
			<ChatList isLoading={isLoading} isError={isError} chats={chats} />
		</Flex>
	);
});
