import { memo } from 'react';
import { SearchChatsByName } from '@/features/SearchChatsByName';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Card } from '@/shared/ui/Card';

const ChatsPage = memo(() => {
	const authData = useSelector(getUserAuthData);

	return (
		<Card width="100%">
			<SearchChatsByName userId={authData?.id ?? ''} />
		</Card>
	);
});

export default ChatsPage;
