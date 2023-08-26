import { memo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Flex } from '@/shared/ui/Flex';
import { getUserAuthData } from '@/entities/User';
import { Messenger } from '@/features/Messenger';

const MessengerPage = memo(() => {
	const params = useParams<{ id: string }>();
	const [searchParams] = useSearchParams();
	const authData = useSelector(getUserAuthData);

	return (
		<Flex data-testid="MessengerPage" height="100%">
			<Messenger
				userId={authData?.id ?? ''}
				friendId={searchParams.get('friendId') ?? ''}
				chatId={params.id ?? ''}
			/>
		</Flex>
	);
});

export default MessengerPage;
