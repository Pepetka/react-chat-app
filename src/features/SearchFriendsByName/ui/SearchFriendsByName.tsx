import { memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from '@/shared/ui/Flex';
import { FriendForm, FriendList } from '@/entities/Friend';
import {
	useAddFriendMutation,
	useLazyFetchFriendsQuery,
} from '../api/searchFriendsByNameApi';

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
		// eslint-disable-next-line
	}, [onFetchFriends, profileId]);

	return (
		<Flex direction="column" gap="16">
			<FriendForm
				data-testid="SearchFriendsByName"
				userId={userId}
				profileId={profileId}
				fetchFriends={onFetchFriends}
			/>
			<FriendList
				data-testid="SearchFriendsByName"
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
