import { memo } from 'react';
import { Chat } from '@/entities/Chat';
import { Flex } from '@/shared/ui/Flex';
import { ChatCard } from '../ChatCard/ChatCard';
import { Text } from '@/shared/ui/Text';
import { useTranslation } from 'react-i18next';
import { ChatCardSkeleton } from '@/entities/Chat/ui/ChatCardSkeleton/ChatCardSkeleton';

interface IChatListProps {
	chats?: Array<Chat>;
	isLoading: boolean;
	isError: boolean;
}

export const ChatList = memo((props: IChatListProps) => {
	const { chats, isError, isLoading } = props;
	const { t } = useTranslation('chats');

	if (isError && !isLoading) {
		return (
			<Flex direction="column" gap="24">
				<Text
					text={t('Something went wrong')}
					theme="error"
					size="l"
					textAlign="center"
				/>
			</Flex>
		);
	}

	if (isLoading || !chats) {
		return (
			<Flex direction="column" gap="24">
				<ChatCardSkeleton />
				<ChatCardSkeleton />
				<ChatCardSkeleton />
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="24">
			{chats.map((chat) => (
				<ChatCard key={chat.id} chat={chat} />
			))}
		</Flex>
	);
});
