import { memo, useCallback } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { FriendForm } from '../FriendForm/FriendForm';
import { FriendList } from '../FriendList/FriendList';
import { useLazyFetchFriendsQuery } from '../../api/friendApi';

interface IFriendSearchProps {
	userId: string;
	profileId: string;
}

export const FriendSearch = memo((props: IFriendSearchProps) => {
	const { profileId, userId } = props;
	const [fetchFriends, { data: usersLists, isFetching: isLoading, isError }] =
		useLazyFetchFriendsQuery();

	const callback = useCallback(
		({ userId, search }: { userId: string; search: string }) => {
			fetchFriends({ userId, search });
		},
		[fetchFriends],
	);

	return (
		<Flex direction="column" gap="16">
			<FriendForm
				userId={userId}
				profileId={profileId}
				fetchFriends={callback}
			/>
			<FriendList
				userId={userId}
				profileId={profileId}
				fetchFriends={callback}
				usersLists={usersLists}
				isLoading={isLoading}
				isError={isError}
			/>
		</Flex>
	);
});
