import {
	KeyboardEvent,
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { isBrowser } from 'react-device-detect';
import styled from 'styled-components';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Flex';
import { Spinner } from '@/shared/ui/Spinner';
import { UserCard } from '@/shared/ui/UserCard';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import SettingsIcon from '@/shared/assets/more.svg';
import { MessageForm, MessageList } from '@/entities/Message';
import {
	useFetchOnlineQuery,
	useFriendTypingQuery,
	useJoinChatMutation,
	useLazyFetchMessagesQuery,
	useLeaveChatMutation,
	useSendMessageMutation,
	useStopTypingMutation,
	useTypingMessageMutation,
} from '../api/messengerApi';

interface IMessengerProps {
	chatId: string;
	friendId: string;
	userId: string;
}

const StyledContent = styled.div`
	overflow-y: auto;
	height: 100%;
`;

export const Messenger = memo((props: IMessengerProps) => {
	const { chatId, friendId, userId } = props;
	const { t } = useTranslation('chats');
	const [messengerRef, setMessengerRef] = useState<HTMLDivElement>();
	const [isTyping, setIsTyping] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [page, setPage] = useState(0);
	const [limit, _] = useState(10);
	const [onFetchMessages, { data: responseMessages, isLoading, isError }] =
		useLazyFetchMessagesQuery();
	const [onSendMessage, { isLoading: sendLoading, isSuccess }] =
		useSendMessageMutation();
	const { data: online } = useFetchOnlineQuery();
	const [onJoinChat] = useJoinChatMutation();
	const [onLeaveChat] = useLeaveChatMutation();
	const [onUserStartTyping] = useTypingMessageMutation();
	const [onUserStopTyping] = useStopTypingMutation();
	const { data: friendTyping } = useFriendTypingQuery();

	const onFetchMessagesHandle = useCallback(() => {
		if (responseMessages?.endReached || isLoading) return;

		onFetchMessages({
			chatId,
			friendId,
			userId,
			page,
			limit,
		});

		setPage((prev) => prev + 1);
	}, [
		chatId,
		friendId,
		isLoading,
		limit,
		onFetchMessages,
		page,
		responseMessages?.endReached,
		userId,
	]);

	const onStopTyping = useCallback(() => {
		onUserStopTyping(chatId);
		setIsTyping(false);
	}, [onUserStopTyping, chatId]);

	const onSendMessageHandle = useCallback(
		({ text, files }: { text?: string; files?: FileList }) => {
			onStopTyping();

			onSendMessage({
				text,
				files,
				chatId,
				userId,
				friendId,
				page: page - 1,
				limit,
			});
		},
		[chatId, friendId, limit, onSendMessage, onStopTyping, page, userId],
	);

	const onTyping = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === 'Shift') {
				return;
			}

			if (!isTyping) {
				setIsTyping(true);
				onUserStartTyping(chatId);
				timerRef.current = setTimeout(onStopTyping, 3000);
			} else {
				if (timerRef.current) {
					clearTimeout(timerRef.current);
				}
				timerRef.current = setTimeout(onStopTyping, 3000);
			}
		},
		[isTyping, onStopTyping, onUserStartTyping, chatId],
	);

	useLayoutEffect(() => {
		onJoinChat(chatId);

		return () => {
			onLeaveChat(chatId);
		};
	}, [onJoinChat, onLeaveChat, chatId]);

	useEffect(() => {
		onFetchMessagesHandle();

		return () => {
			setPage(0);
		};
		// eslint-disable-next-line
	}, []);

	if (isError && !isLoading) {
		return (
			<Card width="100%" height="100%">
				<Flex width="100%" height="100%" align="center">
					<Text
						text={t('Something went wrong')}
						theme="error"
						size="l"
						textAlign="center"
					/>
				</Flex>
			</Card>
		);
	}

	if (isLoading || !responseMessages) {
		return (
			<Flex width="100%" justify="center" align="center" height="100%">
				<Spinner />
			</Flex>
		);
	}

	return (
		<Flex direction="column" gap="16" height="100%">
			<Card padding="10px" borderRadius={false}>
				<Flex justify="space-between" align="center">
					<Flex gap="16" align="center">
						<UserCard
							id={responseMessages.friend.id}
							avatar={responseMessages.friend.avatar}
							name={`${responseMessages.friend.name}`}
							additionalText={t(
								online?.includes(friendId)
									? `${friendTyping?.isTyping ? 'typing' : 'online'}`
									: 'offline',
							)}
						/>
					</Flex>
					<Button aria-label="Messenger settings" theme="clear">
						<Icon SvgIcon={SettingsIcon} invert size="s" />
					</Button>
				</Flex>
			</Card>
			<Card borderRadius padding="10px" scrollContent>
				<StyledContent
					ref={(ref) => {
						setMessengerRef(ref ?? undefined);
					}}
				>
					{responseMessages.messages && (
						<MessageList
							totalCount={responseMessages.totalCount}
							scrollParent={messengerRef}
							messages={responseMessages.messages}
							userId={userId}
							onStartReached={onFetchMessagesHandle}
						/>
					)}
				</StyledContent>
			</Card>
			<Card padding="10px" borderRadiusBottom={isBrowser}>
				<MessageForm
					isLoading={sendLoading}
					isSuccess={isSuccess}
					onSubmit={onSendMessageHandle}
					onTyping={onTyping}
				/>
			</Card>
		</Flex>
	);
});
