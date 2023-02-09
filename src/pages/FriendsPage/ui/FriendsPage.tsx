import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useParams } from 'react-router-dom';
import { SearchFriendsByName } from '@/features/SearchFriendsByName';

const FriendsPage = memo(() => {
	const authData = useSelector(getUserAuthData);
	const params = useParams<{ id: string }>();

	return (
		<Card height="100%" width="100%" borderRadius={false}>
			<SearchFriendsByName
				userId={authData?.id ?? ''}
				profileId={params?.id ?? ''}
			/>
		</Card>
	);
});

export default FriendsPage;
