import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { getUserAuthData } from '@/entities/User';
import { SearchGroupsByName } from '@/features/SearchGroupsByName';

const GroupsListPage = memo(() => {
	const authData = useSelector(getUserAuthData);
	const params = useParams<{ id: string }>();

	return (
		<Card
			data-testid="GroupsListPage"
			height="100%"
			width="100%"
			borderRadius={false}
		>
			<SearchGroupsByName
				userId={authData?.id ?? ''}
				profileId={params.id ?? ''}
			/>
		</Card>
	);
});

export default GroupsListPage;
