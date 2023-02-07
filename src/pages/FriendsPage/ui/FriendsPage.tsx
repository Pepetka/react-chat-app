import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { FriendForm, FriendList } from '@/entities/Friend';
import { Flex } from '@/shared/ui/Flex';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useParams } from 'react-router-dom';

const FriendsPage = memo(() => {
	const authData = useSelector(getUserAuthData);
	const params = useParams<{ id: string }>();

	return (
		<Card height="100%" width="100%" borderRadius={false}>
			<Flex direction="column" gap="16">
				<FriendForm />
				<FriendList userId={authData?.id ?? ''} profileId={params?.id ?? ''} />
			</Flex>
		</Card>
	);
});

export default FriendsPage;
