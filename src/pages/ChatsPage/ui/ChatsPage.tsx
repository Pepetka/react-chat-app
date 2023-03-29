import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { getUserAuthData } from '@/entities/User';
import { SearchChatsByName } from '@/features/SearchChatsByName';

const ChatsPage = memo(() => {
	const authData = useSelector(getUserAuthData);

	return (
		<Card width="100%">
			<SearchChatsByName userId={authData?.id ?? ''} />
		</Card>
	);
});

export default ChatsPage;
