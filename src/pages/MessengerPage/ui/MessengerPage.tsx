import { memo, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isBrowser } from 'react-device-detect';
import { Flex } from '@/shared/ui/Flex';
import { Card } from '@/shared/ui/Card';
import { UserCard } from '@/shared/ui/UserCard';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import SettingsIcon from '@/shared/assets/more.svg';
import { Spinner } from '@/shared/ui/Spinner';
import { Text } from '@/shared/ui/Text';
import { MessageForm, MessageList } from '@/entities/Message';
import { getUserAuthData } from '@/entities/User';
import {
	useFetchMessagesQuery,
	useFetchOnlineQuery,
	useSendMessageMutation,
} from '../api/messengerPageApi';

const StyledContent = styled.div`
	overflow-y: auto;
	height: 100%;
`;

const MessengerPage = memo(() => {
	const { t } = useTranslation('chats');
	const messengerRef = useRef<HTMLDivElement | null>(null);
	const params = useParams<{ id: string }>();
	const [searchParams] = useSearchParams();
	const authData = useSelector(getUserAuthData);
	const {
		data: responseMessages,
		isLoading,
		isError,
	} = useFetchMessagesQuery(
		{
			chatId: params.id ?? '',
			userId: authData?.id ?? '',
			friendId: searchParams.get('friendId') ?? '',
		},
		{
			pollingInterval: 5000,
		},
	);
	const [onSendMessage, { isLoading: sendLoading, isSuccess }] =
		useSendMessageMutation();
	const { data: online } = useFetchOnlineQuery(
		{
			userId: searchParams.get('friendId') ?? '',
		},
		{ pollingInterval: 5000 },
	);

	const onSendMessageHandle = useCallback(
		(text: string, images?: Array<string>) => {
			onSendMessage({
				text,
				img: images,
				chatId: params.id ?? '',
				userId: authData?.id ?? '',
				friendId: searchParams.get('friendId') ?? '',
			});
		},
		[authData?.id, onSendMessage, params.id, searchParams],
	);

	useEffect(() => {
		if (responseMessages) {
			messengerRef.current?.scrollTo(0, messengerRef.current?.scrollHeight);
		}
	}, [responseMessages]);

	if (isError && !isLoading) {
		return (
			<Card width="100%">
				<Text
					text={t('Something went wrong')}
					theme="error"
					size="l"
					textAlign="center"
				/>
			</Card>
		);
	}

	if (isLoading || !responseMessages) {
		return (
			<Flex width="100%" height="100%" justify="center" align="center">
				<Spinner />
			</Flex>
		);
	}

	return (
		<Flex
			direction="column"
			gap="16"
			height={
				isBrowser
					? 'calc(var(--page-height) - var(--page-padding))'
					: 'calc(var(--page-height-mobile))'
			}
		>
			<Card padding="10px" borderRadius={false}>
				<Flex justify="space-between" align="center">
					<UserCard
						id={responseMessages.friend.id}
						avatar={responseMessages.friend.avatar}
						name={`${responseMessages.friend.name}`}
						additionalText={t(online ?? 'offline')}
					/>
					<Button theme="clear">
						<Icon SvgIcon={SettingsIcon} invert size="s" />
					</Button>
				</Flex>
			</Card>
			<Card borderRadius padding="10px" scrollContent>
				<StyledContent ref={messengerRef}>
					{responseMessages.messages && (
						<MessageList
							messages={responseMessages.messages}
							userId={authData?.id ?? ''}
						/>
					)}
				</StyledContent>
			</Card>
			<Card padding="10px" borderRadiusBottom={isBrowser}>
				<MessageForm
					isLoading={sendLoading}
					isSuccess={isSuccess}
					onSubmit={onSendMessageHandle}
				/>
			</Card>
		</Flex>
	);
});

export default MessengerPage;
