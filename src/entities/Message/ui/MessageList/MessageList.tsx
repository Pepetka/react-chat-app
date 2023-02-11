import { Fragment, memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { sortByDate } from '@/shared/helpers/sortByDate';
import { sortByTime } from '@/shared/helpers/sortByTime';
import { Messages } from '../../model/types/messageSchema';
import { MessageCard } from '../MessageCard/MessageCard';

interface IMessageListProps {
	messages: Messages;
	userId: string;
}

export const MessageList = memo((props: IMessageListProps) => {
	const { messages, userId } = props;

	return (
		<Flex direction="column" gap="16">
			{Object.entries(messages)
				.sort((prev, current) => sortByDate(prev[0], current[0], 'up'))
				.map(([date, messages]) => (
					<Fragment key={date}>
						<Text text={date} textAlign="center" theme="secondary-invert" />
						<Flex direction="column" gap="8">
							{messages
								.sort((prev, current) =>
									sortByTime(prev.time, current.time, 'up'),
								)
								.map((message, index) => (
									<Flex
										key={index}
										justify={userId === message.authorId ? 'end' : 'start'}
									>
										<MessageCard
											admin={userId === message.authorId}
											message={message}
										/>
									</Flex>
								))}
						</Flex>
					</Fragment>
				))}
		</Flex>
	);
});
