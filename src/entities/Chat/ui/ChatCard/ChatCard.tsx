import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { UserCard } from '@/shared/ui/UserCard';
import { Text } from '@/shared/ui/Text';
import { getMessengerPagePath } from '@/shared/const/router';
import { Chat } from '../../model/types/chatSchema';

interface IChatCardProps {
	chat: Chat;
}

export const ChatCard = memo((props: IChatCardProps) => {
	const { chat } = props;

	return (
		<Flex justify="space-between">
			<UserCard
				width="calc(100% - 170px)"
				avatarSize="l"
				user={chat.user}
				additionalText={chat.lastMessage}
				border
				href={getMessengerPagePath(chat.id)}
			/>
			<Text
				text={chat.createdAt}
				theme="secondary-invert"
				width="170px"
				textAlign="right"
			/>
		</Flex>
	);
});
