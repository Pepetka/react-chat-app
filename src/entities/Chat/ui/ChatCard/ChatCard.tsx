import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Flex } from '@/shared/ui/Flex';
import { UserCard } from '@/shared/ui/UserCard';
import { Text } from '@/shared/ui/Text';
import { getMessengerPagePath } from '@/shared/const/router';
import { Chat } from '../../model/types/chatSchema';

interface IChatCardProps {
	chat: Chat;
	'data-testid'?: string;
}

export const ChatCard = memo((props: IChatCardProps) => {
	const { chat, 'data-testid': dataTestId } = props;
	const isSmallScreen = useMediaQuery({ maxWidth: 768 });

	return (
		<Flex data-testid={dataTestId} justify="space-between">
			<UserCard
				width="calc(100% - 170px)"
				avatarSize={isSmallScreen ? 'm' : 'l'}
				textSize={isSmallScreen ? 'm' : 'l'}
				id={chat.user.id}
				name={chat.user.name}
				avatar={chat.user.avatar}
				additionalText={chat.lastMessage}
				border
				href={getMessengerPagePath(chat.id, `friendId=${chat.user.id}`)}
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
