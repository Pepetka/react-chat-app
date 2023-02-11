import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Flex } from '@/shared/ui/Flex';
import { MessageForm, MessageList } from '@/entities/Message';
import { Card } from '@/shared/ui/Card';
import { UserCard } from '@/shared/ui/UserCard';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import SettingsIcon from '@/shared/assets/more.svg';
import { UserMini } from '@/shared/types/userCard';
import { Messages } from '@/entities/Message/model/types/messageSchema';

const user: UserMini = {
	id: '0',
	avatar:
		'https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png',
	firstname: 'Ivan',
	lastname: 'Ivanov',
};

const messages: Messages = {
	'03.02.2023': [
		{
			authorId: '0',
			text: 'Hi',
			name: 'Max Ivanov',
			time: '12:48',
		},
		{
			authorId: '1',
			text: 'Hello',
			name: 'Ivan Ivanov',
			time: '12:49',
		},
		{
			authorId: '0',
			text: 'Hello',
			name: 'Ivan Ivanov',
			time: '12:30',
		},
	],
	'04.02.2023': [
		{
			authorId: '0',
			text: 'Hi',
			name: 'Max Ivanov',
			time: '12:48',
		},
		{
			authorId: '1',
			text: 'Hello',
			name: 'Ivan Ivanov',
			time: '12:49',
		},
	],
	'02.02.2023': [
		{
			authorId: '0',
			text: 'Hi',
			name: 'Max Ivanov',
			time: '12:48',
		},
		{
			authorId: '1',
			text: 'Hello',
			name: 'Ivan Ivanov',
			time: '12:49',
		},
	],
};

const StyledContent = styled.div`
	overflow-y: auto;
	height: 100%;
`;

const MessengerPage = memo(() => {
	const { t } = useTranslation('chats');
	const messengerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		messengerRef.current?.scrollTo(0, messengerRef.current?.offsetHeight);
	}, []);

	return (
		<Flex direction="column" gap="16" height="var(--page-height)">
			<Card padding="10px" borderRadius={false}>
				<Flex justify="space-between" align="center">
					<UserCard user={user} additionalText={t('online')} />
					<Button theme="clear">
						<Icon SvgIcon={SettingsIcon} invert size="s" />
					</Button>
				</Flex>
			</Card>
			<Card borderRadius padding="10px" scrollContent>
				<StyledContent ref={messengerRef}>
					<MessageList messages={messages} userId={'1'} />
				</StyledContent>
			</Card>
			<Card padding="10px">
				<MessageForm isLoading={false} isSuccess={false} />
			</Card>
		</Flex>
	);
});

export default MessengerPage;
