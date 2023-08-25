import { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { GroupedVirtuoso } from 'react-virtuoso';
import styled from 'styled-components';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Message, Messages } from '../../model/types/messageSchema';
import { MessageCard } from '../MessageCard/MessageCard';

interface IMessageListProps {
	userId: string;
	scrollParent?: HTMLElement;
	messages: Messages;
	onStartReached: () => void;
	totalCount: number;
}

const StyledList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const StyledGroup = styled.div`
	width: 100%;
	height: 40px;
	background-color: var(--invert-bg-color);
	display: flex;
	align-items: center;
`;

const List = memo(
	forwardRef<HTMLDivElement>((data, ref) => {
		return <StyledList ref={ref} {...data} />;
	}),
);

const Group = memo((data) => {
	return <StyledGroup {...data} />;
});

const useListData = (messages: Messages, length: number) => {
	const [groupCounts, setGroupCounts] = useState(
		Array(messages.length)
			.fill(0)
			.map((_, index) => messages[index][1].length),
	);
	const [messagesArr, setMessagesArr] = useState(
		messages.reduce<Array<Message>>((acc, curr) => [...acc, ...curr[1]], []),
	);
	const [groupTitles, setGroupTitles] = useState(
		messages.reduce<Array<string>>((acc, curr) => [...acc, curr[0]], []),
	);
	const [firstItemIndex, setFirstItemIndex] = useState(
		Math.max(length - messagesArr.length, 0),
	);

	const setMessages = useCallback(
		(messages: Messages) => {
			setGroupCounts(
				Array(messages.length)
					.fill(0)
					.map((_, index) => messages[index][1].length),
			);
			setMessagesArr(
				messages.reduce<Array<Message>>(
					(acc, curr) => [...acc, ...curr[1]],
					[],
				),
			);
			setGroupTitles(
				messages.reduce<Array<string>>((acc, curr) => [...acc, curr[0]], []),
			);
			setFirstItemIndex(Math.max(length - messagesArr.length, 0));
		},
		[length, messagesArr.length],
	);

	return {
		firstItemIndex,
		groupCounts,
		messagesArr,
		groupTitles,
		setMessages,
	};
};

export const MessageList = memo((props: IMessageListProps) => {
	const { userId, scrollParent, onStartReached, messages, totalCount } = props;
	const { firstItemIndex, messagesArr, groupCounts, groupTitles, setMessages } =
		useListData(messages, totalCount);

	const onStartReachedHandle = useCallback(() => {
		onStartReached();
	}, [onStartReached]);

	useEffect(() => {
		setMessages(messages);
	}, [messages, setMessages]);

	return (
		<GroupedVirtuoso
			customScrollParent={scrollParent}
			overscan={{
				main: scrollParent?.clientHeight ?? 0,
				reverse: scrollParent?.clientHeight ?? 0,
			}}
			components={{
				List,
				Group,
			}}
			groupCounts={groupCounts}
			context={{ groupTitles }}
			groupContent={(index, { groupTitles }) => {
				return (
					<Text
						text={groupTitles[index] ?? ''}
						textAlign="center"
						theme="secondary-invert"
					/>
				);
			}}
			startReached={onStartReachedHandle}
			firstItemIndex={firstItemIndex}
			initialTopMostItemIndex={9}
			itemContent={(index) => {
				const message = messagesArr[messagesArr.length - (totalCount - index)];

				if (!message) {
					return (
						<Flex key={index} justify="end">
							<MessageCard
								admin={false}
								message={{
									time: '',
									name: '',
									authorId: '',
									id: '',
									text: '',
								}}
							/>
						</Flex>
					);
				}

				return (
					<Flex
						key={message.id}
						justify={userId === message.authorId ? 'end' : 'start'}
					>
						<MessageCard
							admin={userId === message.authorId}
							message={message}
						/>
					</Flex>
				);
			}}
		/>
	);
});
