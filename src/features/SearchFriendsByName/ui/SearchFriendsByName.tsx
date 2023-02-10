import { memo, useCallback, useEffect } from 'react';
import {
	useAddFriendMutation,
	useLazyFetchFriendsQuery,
} from '../api/searchFriendsByNameApi';
import { Flex } from '@/shared/ui/Flex';
import { FriendForm, FriendList } from '@/entities/Friend';
import { useSearchParams } from 'react-router-dom';

interface ISearchFriendsByNameProps {
	userId: string;
	profileId: string;
}

export const SearchFriendsByName = memo((props: ISearchFriendsByNameProps) => {
	const { profileId, userId } = props;
	const [searchParams] = useSearchParams();
	const [onFetchFriends, { data: usersLists, isFetching: isLoading, isError }] =
		useLazyFetchFriendsQuery();
	const [onAddFriend] = useAddFriendMutation();

	useEffect(() => {
		onFetchFriends({
			userId: profileId,
			search: searchParams.get('search') ?? '',
		});
	}, [onFetchFriends, profileId]);

	return (
		<Flex direction="column" gap="16">
			<FriendForm
				userId={userId}
				profileId={profileId}
				fetchFriends={onFetchFriends}
			/>
			<FriendList
				userId={userId}
				profileId={profileId}
				usersLists={usersLists}
				isLoading={isLoading}
				isError={isError}
				onAddFriend={onAddFriend}
			/>
		</Flex>
	);
});
