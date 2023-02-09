import { memo, useCallback } from 'react';
import {
	useAddFriendMutation,
	useLazyFetchFriendsQuery,
} from '../api/searchFriendsByNameApi';
import { Flex } from '@/shared/ui/Flex';
import { FriendForm, FriendList } from '@/entities/Friend';

interface ISearchFriendsByNameProps {
	userId: string;
	profileId: string;
}

export const SearchFriendsByName = memo((props: ISearchFriendsByNameProps) => {
	const { profileId, userId } = props;
	const [fetchFriends, { data: usersLists, isFetching: isLoading, isError }] =
		useLazyFetchFriendsQuery();
	const [onAddFriend] = useAddFriendMutation();

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
				onAddFriend={onAddFriend}
			/>
		</Flex>
	);
});
